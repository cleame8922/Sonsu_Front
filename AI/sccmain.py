from flask import Flask, Response, jsonify, request
import random
import pymysql
import cv2
import os
from flask_cors import CORS
from scc import CameraManager, InferenceEngine
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from dotenv import load_dotenv
import mediapipe as mp

# ------------------- 환경 설정 -------------------
load_dotenv()
app = Flask(__name__)
# 모든 라우트에 대해 CORS 적용, withCredentials 사용 가능
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

app.config['JWT_SECRET_KEY'] = os.getenv("JWT_KEY")
jwt = JWTManager(app)

# ------------------- 카메라/모델 초기화 -------------------
camera = CameraManager()
inference = InferenceEngine()

# ------------------- 게임 라우트 -------------------
@app.route('/get_question', methods=['GET'])
def game1_get_question():
    question = random.choice(inference.actions)
    inference.set_question(question)
    return jsonify({"question": question})

@app.route('/get_game_info', methods=['GET'])
def game1_get_game_info():
    question, result, confidence = inference.get_state()

    if confidence is not None:
        confidence = float(confidence)

    print("👉 게임 상태:", question, result, confidence)

    return jsonify({
        "question": question,
        "game_result": result,
        "confidence": confidence
    })

# ------------------- 오답 저장 -------------------
@app.route('/save_incorrect', methods=['POST'])
@jwt_required()
def save_result():
    data = request.json
    user_id = get_jwt_identity()
    answers = data.get('answers', [])

    try:
        conn = pymysql.connect(
            host='database-sonsu.c3gig4u4qamm.ap-northeast-2.rds.amazonaws.com',
            user='user',
            password='useruser',
            db='db_sonsu',
            charset='utf8'
        )
        with conn.cursor() as cursor:
            for ans in answers:
                question = ans.get("question")
                confidence = ans.get("confidence")
                if confidence is None:
                    confidence = 0.0  # null 방지
                check_accuracy = int(confidence * 100)

                sql = """
                    INSERT INTO games (user_id, check_answer, check_accuracy)
                    VALUES (%s, %s, %s)
                """
                cursor.execute(sql, (user_id, question, check_accuracy))
        conn.commit()
        return jsonify({"status": "success"})
    except Exception as e:
        print("DB 저장 실패:", e)
        return jsonify({"status": "error", "message": str(e)})
    finally:
        conn.close()

# ------------------- 영상 스트리밍 -------------------
def generate_frames_game1(target_width=1080, target_height=607):  # 16:9
    mp_drawing = mp.solutions.drawing_utils
    mp_holistic = inference.mp_holistic

    while True:
        frame = camera.get_frame()
        if frame is None:
            continue

        predicted_action, confidence, game_result = inference.process_frame(frame)

        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = inference.holistic.process(img_rgb)

        if result.pose_landmarks:
            mp_drawing.draw_landmarks(
                frame,
                result.pose_landmarks,
                mp_holistic.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(0,255,255), thickness=2, circle_radius=3),
                mp_drawing.DrawingSpec(color=(0,128,255), thickness=2, circle_radius=2)
            )

        if result.left_hand_landmarks:
            mp_drawing.draw_landmarks(
                frame,
                result.left_hand_landmarks,
                mp_holistic.HAND_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(0,255,0), thickness=2, circle_radius=3),
                mp_drawing.DrawingSpec(color=(0,128,0), thickness=2, circle_radius=2)
            )

        if result.right_hand_landmarks:
            mp_drawing.draw_landmarks(
                frame,
                result.right_hand_landmarks,
                mp_holistic.HAND_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(0,0,255), thickness=2, circle_radius=3),
                mp_drawing.DrawingSpec(color=(0,0,128), thickness=2, circle_radius=2)
            )

        frame = cv2.resize(frame, (target_width, target_height))
        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.route('/video_feed')
def game1_video_feed():
    return Response(generate_frames_game1(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/get_confidence')
def get_confidence_route():
    return jsonify({'confidence': inference.confidence_value})

# ------------------- 서버 실행 -------------------
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
