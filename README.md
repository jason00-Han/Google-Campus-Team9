# AI Comic Diary

**당신의 일기를 AI를 통해 웹툰으로 만들어주는 프로젝트입니다.**

이 프로젝트는 React 프론트엔드, Spring Boot 백엔드, PostgreSQL 데이터베이스로 구성되어 있으며, Docker를 통해 모든 환경이 컨테이너화되어 있습니다.

## 프로젝트 구조

```
.
├── backend/      # Spring Boot 백엔드 API 서버
├── db/           # 데이터베이스 스키마(SQL), 문서(DBML)
├── frontend/     # React 프론트엔드 웹 애플리케이션
├── Dockerfile.*  # 각 서비스별 Dockerfile
└── docker-compose.yml # 서비스 통합 실행을 위한 Docker Compose 파일
```

## 🚀 시작하기

### 사전 요구사항

프로젝트를 실행하기 위해 호스트 머신에 아래의 도구들이 설치되어 있어야 합니다.

- **Docker & Docker Compose:** 컨테이너 실행 환경
- **Java & Maven (or Gradle):** 백엔드 애플리케이션 빌드

### 설치 및 실행

**1. 백엔드 애플리케이션 빌드**

가장 먼저, Spring Boot 백엔드 애플리케이션을 컴파일하여 `.jar` 파일을 생성해야 합니다. 이 과정은 백엔드 코드가 변경될 때마다 필요합니다.

```bash
# Maven 프로젝트의 경우
cd backend && mvn clean package && cd ..

# Gradle 프로젝트의 경우
cd backend && ./gradlew build && cd ..
```

**2. Docker Compose로 전체 서비스 실행**

프로젝트 루트 디렉토리에서 아래 명령어를 실행하면 모든 서비스의 이미지를 빌드하고 컨테이너를 실행합니다.

```bash
# --build 옵션은 이미지를 새로 빌드하며, -d 옵션은 백그라운드에서 실행합니다.
docker compose up -d --build
```

이제 모든 서비스가 실행되었습니다!

## 도커 사용법

- **전체 서비스 중지:**
  ```bash
  docker compose down
  ```

- **실시간 로그 확인:** (예: `backend` 서비스의 로그 확인)
  ```bash
  docker compose logs -f backend
  ```

- **특정 서비스 재빌드 및 실행:**
  ```bash
  docker compose up -d --build <서비스 이름>
  ```

## 서비스

`docker compose up`으로 실행되는 서비스와 접속 정보는 다음과 같습니다.

| 서비스     | 설명                  | 접속 주소                  |
| :--------- | :-------------------- | :------------------------- |
| `frontend` | React 웹 애플리케이션 | `http://localhost`         |
| `backend`  | Spring Boot API 서버  | `http://localhost:8080`    |
| `db`       | PostgreSQL 데이터베이스 | `localhost:5432` (외부) |

## 데이터베이스

- **초기 스키마:** `db` 컨테이너가 처음 생성될 때, `db/migrations/V1__initial_schema.sql` 스크립트가 자동으로 실행되어 초기 테이블과 관계를 설정합니다.
- **스키마 변경:** 향후 스키마 변경은 `migrations` 폴더에 새로운 버전의 SQL 파일을 추가하여 관리하는 것을 권장합니다. (예: `V2__add_new_table.sql`)
