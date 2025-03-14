export const checkCCVCollision = (objectA, objectBArray) => {
  for (let i = 0; i < objectBArray.length; i++) {
    const objectB = objectBArray[i];
    const dx = objectA.x - objectB.x; // x distance between asteroid and bullet
    const dy = objectA.y - objectB.y; // y distance between asteroid and bullet

    // Calculate relative velocity
    const relativeDx = objectB.dx - objectA.dx;
    const relativeDy = objectB.dy - objectA.dy;

    // Calculate the dot product to check if the objectB is moving towards the asteroid
    const dotProduct = dx * relativeDx + dy * relativeDy;

    // If the dot product is positive, it means the objectB is moving away, so we skip the collision check
    if (dotProduct <= 0) {
      continue;
    }
    // Calculate the squared distance between the centers
    const distanceSquared = dx * dx + dy * dy;
    const combinedRadii = objectA.size + objectB.size; // sum of radii
    // Check if the distance between centers is less than the combined radii
    if (distanceSquared < combinedRadii * combinedRadii) {
      objectBArray.splice(i, 1);
      return objectB;
    }
  }
  return false;
};

export const checkCRCollision = (circle, rectangles) => {
  let closestRect = null;
  let minDistanceSquared = Infinity;

  // Step 1: Find the closest rectangle within possible collision range
  for (let i = 0; i < rectangles.length; i++) {
    const rect = rectangles[i];

    // Calculate the closest point on the rectangle to the circle
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

    // Calculate the squared distance between circle center and closest point
    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    const distanceSquared = dx * dx + dy * dy;

    // Ignore rectangles that are already outside the collision range
    if (distanceSquared > (circle.size * circle.size) / 2) {
      continue;
    }

    // Update the closest rectangle
    if (distanceSquared < minDistanceSquared) {
      minDistanceSquared = distanceSquared;
      closestRect = rect;
    }
  }

  // Step 2: If no rectangle is close enough, return false
  if (!closestRect) return false;

  // Step 3: Double-check collision for the closest rectangle
  const closestX = Math.max(
    closestRect.x,
    Math.min(circle.x, closestRect.x + closestRect.width)
  );
  const closestY = Math.max(
    closestRect.y,
    Math.min(circle.y, closestRect.y + closestRect.height)
  );

  const dx = circle.x - closestX;
  const dy = circle.y - closestY;
  const distanceSquared = dx * dx + dy * dy;

  if (distanceSquared <= (circle.size * circle.size) / 2) {
    return closestRect;
  }
};
