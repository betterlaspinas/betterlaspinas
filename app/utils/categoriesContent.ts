export interface ServiceItem {
  id: string
  title: string
  icon: string
  description: string
  fee: string
  time: string
  link?: string
  hidden?: boolean
}

export interface OfficeCard {
  title: string
  icon: string
  description: string
  link: string
  hidden?: boolean
}

export interface CategoryContent {
  id: string
  name: string
  icon: string
  badgeText: string
  description: string
  services: ServiceItem[]
  offices: OfficeCard[]
  hidden?: boolean
}

// Every resident-facing Service Category is now sourced canonically from
// app/config/categories.json + services.json via the configHelper accessor
// (`certificates` in #184, the remaining Categories in #186). Their Service and
// Service Detail data was moved out of this module into the canonical source,
// so this catalog is intentionally empty. The module itself (interfaces +
// `getCategoryContent`) is removed in the #183 closer (#189); until then the
// category page keeps the accessor-or-legacy fallback for any not-yet-canonical
// slug.
export const categoriesContent: CategoryContent[] = []

export function getCategoryContent(
  categoryId: string,
): CategoryContent | undefined {
  const category = categoriesContent.find(category => category.id === categoryId)

  if (!category)
    return undefined

  return {
    ...category,
    services: category.services.filter(service => !service.hidden),
    offices: category.offices.filter(office => !office.hidden),
  }
}
