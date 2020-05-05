SELECT *
FROM users
WHERE email = x;


-- trends
<<<<<<< HEAD
SELECT resources.*,
FROM resources
JOIN resource_reviews ON resource_id = resources.id
WHERE
=======
SELECT resources.*, AVG(resource_reviews.ratings) AS rating
FROM resources
JOIN resource_reviews ON resource_id = resources.id
-- how to get date within 24 hours
GROUP BY AVG(resource_reviews.ratings)
HAVING resource_reviews.rating > 4
;

-- get all pins
SELECT resources.*,
>>>>>>> 1888c9a17fe55135c7742a05bf10066d43276d88
