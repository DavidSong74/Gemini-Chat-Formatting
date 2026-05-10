document.addEventListener('DOMContentLoaded', () => {
  const inputEl = document.getElementById('input');
  const formatBtn = document.getElementById('formatBtn');
  const clearBtn = document.getElementById('clearBtn');
  const outputEl = document.getElementById('output');
  const copyRichBtn = document.getElementById('copyRichBtn');
  const copyPlainBtn = document.getElementById('copyPlainBtn');
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const toast = document.getElementById('toast');
  const toastInner = document.getElementById('toastInner');
  const toastIcon = document.getElementById('toastIcon');
  const toastText = document.getElementById('toastText');
  const loadSampleBtn = document.getElementById('loadSample');

  function showToast(message, isError = false) {
    toastText.textContent = message;
    if (isError) {
      toastInner.classList.add('error');
      toastIcon.textContent = '⚠️';
    } else {
      toastInner.classList.remove('error');
      toastIcon.textContent = '✅';
    }
    toast.style.display = 'flex';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2200);
  }

  function setStatus(message, isError = false) {
    statusText.textContent = message;
    if (isError) {
      statusDot.classList.add('error');
    } else {
      statusDot.classList.remove('error');
    }
  }

  function parseGeminiExport(text) {
    const blocks = [];
    const lines = text.split(/\r?\n/);
    let i = 0;

    while (i < lines.length) {
      if (lines[i].trim().toLowerCase().startsWith('# you asked')) {
        i++;
        const qLines = [];
        while (i < lines.length &&
               !lines[i].trim().toLowerCase().startsWith('# gemini response')) {
          const trimmed = lines[i].trim();
          if (
            trimmed.toLowerCase().startsWith('message time:') ||
            trimmed.toLowerCase().startsWith('> from:') ||
            trimmed === '---' ||
            trimmed === ''
          ) {
            i++;
            continue;
          }
          qLines.push(lines[i]);
          i++;
        }

        if (i < lines.length &&
            lines[i].trim().toLowerCase().startsWith('# gemini response')) {
          i++;
        }

        const aLines = [];
        while (i < lines.length &&
               !lines[i].trim().toLowerCase().startsWith('# you asked')) {
          const trimmed = lines[i].trim();
          if (
            trimmed.toLowerCase().startsWith('message time:') ||
            trimmed.toLowerCase().startsWith('> from:') ||
            trimmed.toLowerCase().startsWith('# gemini response') ||
            trimmed === '---'
          ) {
            i++;
            continue;
          }
          aLines.push(lines[i]);
          i++;
        }

        const question = qLines.join('\n').trim();
        const answer = aLines.join('\n').trim();

        if (question || answer) {
          blocks.push({ question, answer });
        }
      } else {
        i++;
      }
    }

    return blocks;
  }

  function renderBlocks(blocks) {
    if (!blocks.length) {
      outputEl.innerHTML =
        '<div class="output-empty">Q&A 블록을 찾을 수 없습니다. 텍스트에 <code># you asked</code>와 <code># gemini response</code> 마커가 포함되어 있는지 확인하세요.</div>';
      return;
    }
    const frag = document.createDocumentFragment();
    blocks.forEach((b, idx) => {
      const wrap = document.createElement('div');
      wrap.className = 'qa-block';

      if (b.question) {
        const qEl = document.createElement('div');
        qEl.className = 'q';
        qEl.textContent = b.question;
        wrap.appendChild(qEl);
      }

      if (b.answer) {
        const aEl = document.createElement('div');
        aEl.className = 'a';
        aEl.textContent = b.answer;
        wrap.appendChild(aEl);
      }

      frag.appendChild(wrap);
    });
    outputEl.innerHTML = '';
    outputEl.appendChild(frag);
  }

  formatBtn.addEventListener('click', () => {
    const raw = inputEl.value;
    if (!raw.trim()) {
      setStatus('포맷팅할 내용이 없습니다. 먼저 제미나이 텍스트를 붙여넣으세요.', true);
      showToast('먼저 제미나이 텍스트를 붙여넣으세요.', true);
      return;
    }
    const blocks = parseGeminiExport(raw);
    renderBlocks(blocks);
    if (blocks.length) {
      setStatus(`${blocks.length}개의 Q&A 블록이 포맷팅되었습니다.`);
    } else {
      setStatus('Q&A 블록을 찾을 수 없습니다. 마커를 확인하세요.', true);
    }
  });

  clearBtn.addEventListener('click', () => {
    inputEl.value = '';
    outputEl.innerHTML =
      '<div class="output-empty">포맷팅된 결과가 여기에 표시됩니다.</div>';
    setStatus('지워졌습니다. 제미나이 텍스트를 붙여넣고 포맷팅을 클릭하세요.');
  });

  copyRichBtn.addEventListener('click', async () => {
    const selection = window.getSelection();
    const range = document.createRange();
    try {
      range.selectNodeContents(outputEl);
      selection.removeAllRanges();
      selection.addRange(range);
      const successful = document.execCommand('copy');
      selection.removeAllRanges();
      if (successful) {
        showToast('서식 있는 텍스트가 복사되었습니다.');
      } else {
        showToast('복사에 실패했습니다. 수동으로 선택해 보세요.', true);
      }
    } catch (e) {
      selection.removeAllRanges();
      showToast('복사 실패: ' + e.message, true);
    }
  });

  copyPlainBtn.addEventListener('click', async () => {
    const text = outputEl.innerText || '';
    if (!text.trim()) {
      showToast('아직 복사할 내용이 없습니다.', true);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast('일반 텍스트가 복사되었습니다.');
    } catch {
      showToast('클립보드가 차단되었습니다. 수동으로 복사하세요.', true);
    }
  });

  loadSampleBtn.addEventListener('click', () => {
    const sample = `> From: https://gemini.google.com/app/0b56c76930eb84e7

# you asked

message time: 2026-05-09 22:38:28

포괄적 칭의론과 그리스도의 믿음에 대하여 부산에서 연구하고 있는 박사님에 대해서 말해줘

---

# gemini response

부산에서 **'포괄적(또는 총체적) 칭의론'**과 **'그리스도의 믿음(*pistis Christou*)'**을 핵심적으로 연구하고 있는 대표적인 신학자는 **고신대학교(영도구 소재)**의 **박영돈 명예교수**와 **최승락 교수**를 꼽을 수 있습니다.

특히 두 분은 개혁주의 신학의 전통을 지키면서도 현대 바울 신학의 난제들을 깊이 있게 다루고 있어, 부산 지역뿐만 아니라 한국 신학계 전체에서 이 주제의 권위자로 인정받고 있습니다.`;
    inputEl.value = sample;
    setStatus('샘플이 불러와졌습니다. 결과를 보려면 포맷팅을 클릭하세요.');
  });
});
