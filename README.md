# email-generator-backend

You need .env and config/serviceAccountKey.json to run

docker run --name email-generator-node-container --env-file ./.env -p 4545:4545 -v email-generator-node-volume:/email_generator_node email-generator-node

docker run -itd --name redis-server -p 6379:6379 redis