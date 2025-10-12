-- db/data/seed_data.sql

-- Insert default styles
INSERT INTO styles (key, name, description) VALUES
('webtoon', '웹툰 스타일', '선명한 선과 채색을 가진 대중적인 웹툰 그림체입니다.'),
('sketch', '스케치 스타일', '연필이나 펜으로 그린 듯한 거친 느낌의 흑백 그림체입니다.'),
('pixel_art', '픽셀 아트 스타일', '제한된 색상과 해상도를 가진 레트로 게임 느낌의 그림체입니다.'),
('realistic', '실사 스타일', '사진과 같이 사실적인 묘사를 특징으로 하는 그림체입니다.');

-- Insert default genres
INSERT INTO genres (key, name, description) VALUES
('daily_life', '일상', '평범한 일상 속의 소소한 사건들을 다루는 장르입니다.'),
('fantasy', '판타지', '마법이나 상상 속의 존재가 등장하는 비현실적인 세계를 다루는 장르입니다.'),
('comedy', '코미디', '독자를 웃게 만드는 재미있는 상황이나 대화를 중심으로 하는 장르입니다.'),
('thriller', '스릴러', '긴장감과 공포를 유발하는 사건을 다루는 장르입니다.');
