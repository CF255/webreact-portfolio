export default function isOwner(resourceUserId, requestUserId) {
  if (!resourceUserId || !requestUserId) {
    return false;
  }
  return resourceUserId.toString() === requestUserId.toString();
}
