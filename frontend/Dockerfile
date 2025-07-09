# 1단계: 빌드 단계
FROM node:18-alpine AS builder

WORKDIR /app

# npm registry 명시 & 빠른 설치
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org \
    && npm ci

COPY . ./
RUN npm run build

# 2단계: nginx 서빙
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# 선택: nginx 설정
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
