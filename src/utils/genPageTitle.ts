export default function (prefix?: string | null | undefined) {
  const siteTtile = "CozyZoey's Blog"
  return prefix ? prefix + ' | ' + siteTtile : siteTtile
}
