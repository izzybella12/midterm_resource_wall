SELECT *
FROM users
WHERE email = x;


-- trends
SELECT resources.*, AVG(resource_reviews.ratings) AS rating
FROM resources
JOIN resource_reviews ON resource_id = resources.id
-- how to get date within 24 hours
GROUP BY AVG(resource_reviews.ratings)
HAVING resource_reviews.rating > 4
;

-- get all pins
SELECT resources.*,

SELECT resources.*, AVG(resource_reviews.rating) AS rating
 FROM resources
 LEFT JOIN resource_reviews ON resource_id = resources.id
 WHERE category = 'Technology';
 GROUP BY resources.id