# Gemini-Chat-Formatting
Extension for Gemini Chat Formatting
#English
Gemini Q&A Formatter
A Chrome extension that removes unnecessary metadata from exported AI conversations and neatly formats them into a clean Q&A structure.

💡 Why I Built This
When exporting or backing up conversations with AI chatbots (especially Gemini), the extracted text often includes unnecessary metadata along with the actual conversation, such as sender info (> From:), message time (message time:), and divider lines (---).

Manually deleting this unnecessary text every time is quite tedious. Therefore, I built this formatter extension to strictly parse only the user's questions (# you asked) and the AI's answers (# gemini response), and to refine the text for better readability (e.g., highlighting questions in bold blue text).

🔗 Required Companion Extension
This extension is highly optimized to format text structures exported by the following AI conversation exporter. Please make sure to extract text using the extension below before using this formatter:

AI Exporter: ChatGPT·Gemini 대화 저장 (PDF/Word/MD) | Notion 연동 | NotebookLM 지원
🚀 How to Install
Open Chrome and type chrome://extensions/ in the address bar to go to the extensions management page.
Toggle on Developer mode in the top right corner of the page.
Click the Load unpacked button in the top left corner.
Select the downloaded folder (this repository).
Once installed, click the puzzle icon next to the Chrome address bar to pin the extension for easy access.
📝 How to Use
Export and copy your Gemini conversation text using the AI Exporter extension.
Click the Gemini Q&A Formatter extension icon to launch it.
Paste (⌘+V / Ctrl+V) the copied original conversation text into the left input field.
Click the [✨ Format] button.
Check the cleanly formatted Q&A result without metadata on the right, and use [📋 Copy Rich Text] to paste it directly into Google Docs, Notion, or your blog!





#Korean
# 제미나이 Q&A 포맷터 (Gemini Q&A Formatter)

AI 대화 내용을 내보낼 때 포함되는 불필요한 메타데이터를 제거하고 깔끔한 Q&A 형태로 정리해주는 크롬 확장 프로그램입니다.

## 💡 제작 이유 (Why I Built This)

AI 챗봇(특히 제미나이)과의 대화를 외부 문서로 내보내거나 백업할 때, 대화 내용 외에도 송신자 정보(`> From:`), 메시지 시간(`message time:`), 구분선(`---`) 등 불필요한 메타데이터가 함께 텍스트로 추출되는 경우가 많습니다.

이러한 불필요한 텍스트를 매번 수동으로 지우는 것은 매우 번거로운 일입니다. 따라서 오직 사용자의 **질문(# you asked)**과 AI의 **답변(# gemini response)** 내용만 깔끔하게 파싱하고, 가독성을 높이기 위해(질문은 파란색 굵은 글씨 등) 별도로 텍스트를 다듬어주는 이 포맷터 확장 프로그램을 제작하게 되었습니다.

## 🔗 필수 연동 확장 프로그램 (Required Extension)

본 확장 프로그램은 아래의 AI 대화 추출 확장 프로그램에서 추출된 텍스트 구조를 포맷팅하는 데 최적화되어 있습니다. 반드시 아래의 확장 프로그램을 이용해 텍스트를 추출한 후 사용해 주세요.

* **[AI Exporter: ChatGPT·Gemini 대화 저장 (PDF/Word/MD) | Notion 연동 | NotebookLM 지원](https://chromewebstore.google.com/detail/ai-exporter-chatgpt%C2%B7gemin/kagjkiiecagemklhmhkabbalfpbianbe?hl=ko)**

## 🚀 설치 방법 (How to Install)

1. 크롬 주소창에 `chrome://extensions/`를 입력하여 확장 프로그램 관리 페이지로 이동합니다.
2. 페이지 우측 상단의 **개발자 모드(Developer mode)**를 켭니다.
3. 좌측 상단의 **압축해제된 확장 프로그램을 로드합니다(Load unpacked)**를 클릭합니다.
4. 다운로드 받은(이 리포지토리의) 폴더를 선택하여 로드합니다.
5. 설치가 완료되면 크롬 주소창 옆의 확장 프로그램 퍼즐 아이콘을 눌러 포맷터를 고정(Pin)해두고 편하게 사용하세요.

## 📝 사용 방법 (How to Use)

1. **AI Exporter** 확장 프로그램을 이용해 제미나이(Gemini) 대화 내용을 텍스트 형식으로 추출 및 복사합니다.
2. 본 **제미나이 Q&A 포맷터** 확장 프로그램 아이콘을 클릭하여 실행합니다.
3. 복사한 원본 대화 텍스트를 좌측의 입력창에 붙여넣기(⌘+V / Ctrl+V) 합니다.
4. **[✨ 포맷팅]** 버튼을 클릭합니다.
5. 우측 출력창에 메타데이터가 지워진 깔끔한 Q&A 결과를 확인하고, **[📋 서식 있는 텍스트 복사]**를 눌러 구글 문서, 노션, 블로그 등에 바로 붙여넣기 하여 사용하세요!
