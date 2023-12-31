export const PAGINATION_SIZE = 8;
export const DEFAULT_GRID_IMG_LOAD_EAGER_COUNT = 4;
export const ATTR_LOADING_EAGER = 'eager';

export function getImageLoadingPriority(
  index,
  maxEagerLoadCount = DEFAULT_GRID_IMG_LOAD_EAGER_COUNT,
) {
  return index < maxEagerLoadCount ? ATTR_LOADING_EAGER : undefined;
}

export const KIT_REFILL_QUANTITY_OPTION_NAME = 'Serum Refill Quantity';

export const ANALYTICS_IDS = {
  pixelTrackingId: '615785837213418',
  gaTrackingId: '',
};
