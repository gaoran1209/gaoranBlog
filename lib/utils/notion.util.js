
/**
 * Notion 数据格式清理工具
 * 统一兼容旧版/新版 API 返回结构，并在渲染前过滤异常 block，避免 SSR 崩溃
 */
export function adapterNotionBlockMap(blockMap) {
  if (!blockMap || typeof blockMap !== 'object') return blockMap

  const result = { ...blockMap }

  // block / collection / collection_view 都可能被 space_id 包裹
  result.block = normalizeMap(blockMap.block, { strictBlock: true })
  result.collection = normalizeMap(blockMap.collection)
  result.collection_view = normalizeMap(blockMap.collection_view)

  // 过滤 block.content 中不存在/非法的引用，避免 notion-utils uuidToId(undefined)
  sanitizeBlockContents(result.block)

  return result
}

function normalizeMap(map, options = {}) {
  if (!map || typeof map !== 'object') return {}

  const strictBlock = Boolean(options.strictBlock)
  const cleaned = {}

  for (const [id, item] of Object.entries(map)) {
    const value = unwrapValue(item)
    if (!value || typeof value !== 'object') continue

    if (strictBlock) {
      if (typeof value.type !== 'string') continue
      if (!value.id && typeof id === 'string') {
        value.id = id
      }
    }

    cleaned[id] = { value }
  }

  return cleaned
}

function sanitizeBlockContents(blockMap) {
  if (!blockMap || typeof blockMap !== 'object') return

  const validNormalizedIds = new Set()
  for (const [id, block] of Object.entries(blockMap)) {
    const valueId = block?.value?.id
    if (typeof id === 'string') validNormalizedIds.add(normalizeId(id))
    if (typeof valueId === 'string') validNormalizedIds.add(normalizeId(valueId))
  }

  for (const block of Object.values(blockMap)) {
    const value = block?.value
    if (!value || typeof value !== 'object') continue

    if (Array.isArray(value.content)) {
      value.content = value.content.filter(
        cid => typeof cid === 'string' && validNormalizedIds.has(normalizeId(cid))
      )
    } else if (value.content && !Array.isArray(value.content)) {
      delete value.content
    }

    const pointerId = value?.format?.transclusion_reference_pointer?.id
    if (
      value.type === 'transclusion_reference' &&
      (typeof pointerId !== 'string' ||
        !validNormalizedIds.has(normalizeId(pointerId)))
    ) {
      if (value.format?.transclusion_reference_pointer) {
        delete value.format.transclusion_reference_pointer
      }
    }
  }
}

function normalizeId(id) {
  return typeof id === 'string' ? id.replace(/-/g, '') : id
}

function unwrapValue(obj) {
  let cur = obj
  let guard = 0

  while (cur && typeof cur === 'object' && cur.value && typeof cur.value === 'object' && guard < 8) {
    cur = cur.value
    guard++
  }

  return cur
}
