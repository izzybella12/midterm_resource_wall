SELECT *
FROM users
WHERE email = x;


-- trends
SELECT resources.*,
FROM resources
JOIN resource_reviews ON resource_id = resources.id
WHERE
