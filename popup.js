document.addEventListener('DOMContentLoaded', () => {
  const I18N = {
    ko: {
      docTitle: 'AI Q&A 채팅 포메터',
      label: 'qa-포메터',
      h1: 'AI Q&A 채팅 포메터',
      sub: '메타데이터 제거, 질문은 파란색 굵은 글씨로',
      desc: '왼쪽에 AI 채팅 텍스트(ChatGPT, Claude, Gemini, Grok, DeepSeek, Copilot, NotebookLM, Google AI 등)를 붙여넣으세요. 메타데이터를 무시하고 질문과 답변만 남깁니다.',
      langToggle: 'English',
      loadSample: '샘플 불러오기',
      inputTitle: '원본 AI 채팅 텍스트',
      inputBadge: '입력',
      inputPlaceholder: '여기에 # you asked / # [AI] response 블록이 포함된 AI 채팅 텍스트를 붙여넣으세요...',
      format: '포맷팅',
      clear: '지우기',
      outputTitle: '포맷된 Q&A',
      outputBadge: '출력',
      questionsBlue: '질문 = 파란색 굵은 글씨',
      copyRich: '서식 있는 텍스트 복사',
      copyPlain: '일반 텍스트 복사',
      outputEmpty: '포맷팅된 결과가 여기에 표시됩니다. 파란색 굵은 글씨의 질문을 구글 문서에 바로 붙여넣으려면 <code class="shortcut">서식 있는 텍스트 복사</code>를 사용하세요.',
      noBlocksHtml: 'Q&A 블록을 찾을 수 없습니다. 텍스트에 <code># you asked</code>와 <code># [AI] response</code> (예: <code># chatgpt response</code>, <code># claude response</code>, <code># gemini response</code> 등) 마커가 포함되어 있는지 확인하세요.',
      statusIdle: '대기 중. AI 채팅 텍스트를 붙여넣고 포맷팅을 클릭하세요.',
      statusNothing: '포맷팅할 내용이 없습니다. 먼저 AI 채팅 텍스트를 붙여넣으세요.',
      statusFormattedN: (n) => `${n}개의 Q&A 블록이 포맷팅되었습니다.`,
      statusNoBlocks: 'Q&A 블록을 찾을 수 없습니다. 마커를 확인하세요.',
      statusCleared: '지워졌습니다. AI 채팅 텍스트를 붙여넣고 포맷팅을 클릭하세요.',
      statusSampleLoaded: '샘플이 불러와졌습니다. 결과를 보려면 포맷팅을 클릭하세요.',
      toastPasteFirst: '먼저 AI 채팅 텍스트를 붙여넣으세요.',
      toastCopiedRich: '서식 있는 텍스트가 복사되었습니다.',
      toastCopyFailed: '복사에 실패했습니다. 수동으로 선택해 보세요.',
      toastCopyFailedPrefix: '복사 실패: ',
      toastNothingToCopy: '아직 복사할 내용이 없습니다.',
      toastCopiedPlain: '일반 텍스트가 복사되었습니다.',
      toastClipboardBlocked: '클립보드가 차단되었습니다. 수동으로 복사하세요.',
    },
    en: {
      docTitle: 'AI Q&A Chat Formatter',
      label: 'qa-formatter',
      h1: 'AI Q&A Chat Formatter',
      sub: 'strips metadata, blue bold questions',
      desc: 'Paste AI chat text (ChatGPT, Claude, Gemini, Grok, DeepSeek, Copilot, NotebookLM, Google AI, etc.) on the left. Metadata is stripped, leaving only your question and the AI answer.',
      langToggle: '한국어',
      loadSample: 'Load sample',
      inputTitle: 'Raw AI chat text',
      inputBadge: 'input',
      inputPlaceholder: 'Paste your AI chat text with # you asked / # [AI] response blocks here...',
      format: 'Format',
      clear: 'Clear',
      outputTitle: 'Formatted Q&A',
      outputBadge: 'output',
      questionsBlue: 'Questions = bold blue',
      copyRich: 'Copy rich text',
      copyPlain: 'Copy plain text',
      outputEmpty: 'Formatted output will appear here. Use <code class="shortcut">Copy rich text</code> to paste directly into Google Docs with blue bold questions.',
      noBlocksHtml: 'No Q&A blocks found. Make sure your text contains <code># you asked</code> and <code># [AI] response</code> (e.g., <code># chatgpt response</code>, <code># claude response</code>, <code># gemini response</code>, etc.) markers.',
      statusIdle: 'Idle. Paste AI chat text and click Format.',
      statusNothing: 'Nothing to format. Paste AI chat text first.',
      statusFormattedN: (n) => `Formatted ${n} Q&A block${n > 1 ? 's' : ''}.`,
      statusNoBlocks: 'No Q&A blocks found. Check your markers.',
      statusCleared: 'Cleared. Paste AI chat text and click Format.',
      statusSampleLoaded: 'Sample loaded. Click Format to see result.',
      toastPasteFirst: 'Paste AI chat text first.',
      toastCopiedRich: 'Copied formatted rich text.',
      toastCopyFailed: 'Copy failed. Try selecting manually.',
      toastCopyFailedPrefix: 'Copy failed: ',
      toastNothingToCopy: 'Nothing to copy yet.',
      toastCopiedPlain: 'Copied plain text.',
      toastClipboardBlocked: 'Clipboard blocked. Copy manually.',
    },
  };

  let currentLang = localStorage.getItem('qa-formatter-lang') || 'ko';

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
  const langToggleBtn = document.getElementById('langToggle');

  let outputState = { kind: 'empty' };
  let lastBlocks = [];
  let statusState = { key: 'statusIdle', isError: false, args: null };

  function t(key) {
    return I18N[currentLang][key];
  }

  function applyLanguage() {
    document.documentElement.lang = currentLang === 'ko' ? 'ko' : 'en';
    document.title = t('docTitle');

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });

    refreshStatus();
    refreshOutput();
  }

  function refreshStatus() {
    const v = I18N[currentLang][statusState.key];
    statusText.textContent = typeof v === 'function' ? v(statusState.args) : v;
    statusDot.classList.toggle('error', statusState.isError);
  }

  function setStatus(key, isError = false, args = null) {
    statusState = { key, isError, args };
    refreshStatus();
  }

  function refreshOutput() {
    if (outputState.kind === 'empty') {
      outputEl.innerHTML = `<div class="output-empty">${t('outputEmpty')}</div>`;
    } else if (outputState.kind === 'noBlocks') {
      outputEl.innerHTML = `<div class="output-empty">${t('noBlocksHtml')}</div>`;
    } else {
      renderBlocks(lastBlocks);
    }
  }

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

  function isResponseMarker(trimmed) {
    return /^#\s+\S.*\sresponse\s*$/i.test(trimmed);
  }

  function parseAIExport(text) {
    const blocks = [];
    const lines = text.split(/\r?\n/);
    let i = 0;

    while (i < lines.length) {
      if (lines[i].trim().toLowerCase().startsWith('# you asked')) {
        i++;
        const qLines = [];
        while (i < lines.length && !isResponseMarker(lines[i].trim())) {
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

        if (i < lines.length && isResponseMarker(lines[i].trim())) {
          i++;
        }

        const aLines = [];
        while (i < lines.length && !lines[i].trim().toLowerCase().startsWith('# you asked')) {
          const trimmed = lines[i].trim();
          if (
            trimmed.toLowerCase().startsWith('message time:') ||
            trimmed.toLowerCase().startsWith('> from:') ||
            isResponseMarker(trimmed) ||
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

  function renderInline(text, container) {
    let i = 0;
    let buffer = '';
    const flush = () => {
      if (buffer) {
        container.appendChild(document.createTextNode(buffer));
        buffer = '';
      }
    };
    while (i < text.length) {
      if (text[i] === '*' && text[i + 1] === '*') {
        const end = text.indexOf('**', i + 2);
        if (end !== -1 && end > i + 2) {
          flush();
          const strong = document.createElement('strong');
          renderInline(text.slice(i + 2, end), strong);
          container.appendChild(strong);
          i = end + 2;
          continue;
        }
      }
      if (text[i] === '`') {
        const end = text.indexOf('`', i + 1);
        if (end !== -1) {
          flush();
          const code = document.createElement('code');
          code.textContent = text.slice(i + 1, end);
          container.appendChild(code);
          i = end + 1;
          continue;
        }
      }
      if (text[i] === '*' && text[i + 1] !== '*' && (i === 0 || text[i - 1] !== '*')) {
        let end = -1;
        for (let j = i + 1; j < text.length; j++) {
          if (text[j] === '*' && text[j + 1] !== '*' && text[j - 1] !== '*') {
            end = j;
            break;
          }
        }
        if (end !== -1 && end > i + 1) {
          flush();
          const em = document.createElement('em');
          renderInline(text.slice(i + 1, end), em);
          container.appendChild(em);
          i = end + 1;
          continue;
        }
      }
      buffer += text[i];
      i++;
    }
    flush();
  }

  function parseTableRow(line) {
    let s = line.trim();
    if (s.startsWith('|')) s = s.slice(1);
    if (s.endsWith('|')) s = s.slice(0, -1);
    return s.split('|').map((c) => c.trim());
  }

  function isTableSeparator(line) {
    return /^\s*\|?\s*:?-{2,}:?(\s*\|\s*:?-{2,}:?)+\s*\|?\s*$/.test(line || '');
  }

  function renderMarkdown(text, container) {
    const lines = text.split(/\r?\n/);
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed === '' || trimmed === '---') {
        i++;
        continue;
      }

      const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const h = document.createElement('p');
        h.className = 'md-heading';
        const strong = document.createElement('strong');
        renderInline(headingMatch[2], strong);
        h.appendChild(strong);
        container.appendChild(h);
        i++;
        continue;
      }

      if (trimmed.startsWith('>')) {
        const quoteLines = [];
        while (i < lines.length && lines[i].trim().startsWith('>')) {
          quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
          i++;
        }
        const blockquote = document.createElement('blockquote');
        const p = document.createElement('p');
        renderInline(quoteLines.join(' '), p);
        blockquote.appendChild(p);
        container.appendChild(blockquote);
        continue;
      }

      if (trimmed.startsWith('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
        const headerCells = parseTableRow(trimmed);
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          rows.push(parseTableRow(lines[i]));
          i++;
        }
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerCells.forEach((cell) => {
          const th = document.createElement('th');
          renderInline(cell, th);
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        rows.forEach((row) => {
          const tr = document.createElement('tr');
          row.forEach((cell) => {
            const td = document.createElement('td');
            renderInline(cell, td);
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        container.appendChild(table);
        continue;
      }

      if (/^\s*[\*\-\+]\s+/.test(line)) {
        const stack = [];
        while (i < lines.length && /^\s*[\*\-\+]\s+/.test(lines[i])) {
          const m = lines[i].match(/^(\s*)[\*\-\+]\s+(.*)$/);
          const indent = m[1].length;
          const itemText = m[2];

          while (stack.length > 0 && stack[stack.length - 1].indent > indent) {
            stack.pop();
          }

          let ul;
          if (stack.length === 0) {
            ul = document.createElement('ul');
            container.appendChild(ul);
            stack.push({ ul, indent });
          } else if (stack[stack.length - 1].indent < indent) {
            ul = document.createElement('ul');
            const parentUl = stack[stack.length - 1].ul;
            const lastLi = parentUl.lastChild;
            if (lastLi) {
              lastLi.appendChild(ul);
            } else {
              parentUl.appendChild(ul);
            }
            stack.push({ ul, indent });
          } else {
            ul = stack[stack.length - 1].ul;
          }

          const li = document.createElement('li');
          renderInline(itemText, li);
          ul.appendChild(li);
          i++;
        }
        continue;
      }

      if (/^\s*\d+\.\s+/.test(line)) {
        const ol = document.createElement('ol');
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          const m = lines[i].match(/^\s*\d+\.\s+(.*)$/);
          const li = document.createElement('li');
          renderInline(m[1], li);
          ol.appendChild(li);
          i++;
        }
        container.appendChild(ol);
        continue;
      }

      const paraLines = [];
      while (i < lines.length) {
        const tl = lines[i].trim();
        const l = lines[i];
        if (tl === '' || tl === '---') break;
        if (/^#{1,6}\s/.test(tl)) break;
        if (tl.startsWith('>')) break;
        if (/^\s*[\*\-\+]\s+/.test(l)) break;
        if (/^\s*\d+\.\s+/.test(l)) break;
        if (tl.startsWith('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) break;
        paraLines.push(lines[i]);
        i++;
      }
      if (paraLines.length) {
        const p = document.createElement('p');
        renderInline(paraLines.join('\n'), p);
        container.appendChild(p);
      }
    }
  }

  function renderBlocks(blocks) {
    const frag = document.createDocumentFragment();
    blocks.forEach((b) => {
      const wrap = document.createElement('div');
      wrap.className = 'qa-block';

      if (b.question) {
        const qEl = document.createElement('div');
        qEl.className = 'q';
        renderInline(b.question, qEl);
        wrap.appendChild(qEl);
      }

      if (b.answer) {
        const aEl = document.createElement('div');
        aEl.className = 'a';
        renderMarkdown(b.answer, aEl);
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
      setStatus('statusNothing', true);
      showToast(t('toastPasteFirst'), true);
      return;
    }
    const blocks = parseAIExport(raw);
    if (blocks.length) {
      lastBlocks = blocks;
      outputState = { kind: 'rendered' };
      renderBlocks(blocks);
      setStatus('statusFormattedN', false, blocks.length);
    } else {
      outputState = { kind: 'noBlocks' };
      refreshOutput();
      setStatus('statusNoBlocks', true);
    }
  });

  clearBtn.addEventListener('click', () => {
    inputEl.value = '';
    lastBlocks = [];
    outputState = { kind: 'empty' };
    refreshOutput();
    setStatus('statusCleared');
  });

  copyRichBtn.addEventListener('click', () => {
    const selection = window.getSelection();
    const range = document.createRange();
    try {
      range.selectNodeContents(outputEl);
      selection.removeAllRanges();
      selection.addRange(range);
      const successful = document.execCommand('copy');
      selection.removeAllRanges();
      if (successful) {
        showToast(t('toastCopiedRich'));
      } else {
        showToast(t('toastCopyFailed'), true);
      }
    } catch (e) {
      selection.removeAllRanges();
      showToast(t('toastCopyFailedPrefix') + e.message, true);
    }
  });

  copyPlainBtn.addEventListener('click', async () => {
    const text = outputEl.innerText || '';
    if (!text.trim()) {
      showToast(t('toastNothingToCopy'), true);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast(t('toastCopiedPlain'));
    } catch {
      showToast(t('toastClipboardBlocked'), true);
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

특히 두 분은 개혁주의 신학의 전통을 지키면서도 현대 바울 신학의 난제들을 깊이 있게 다루고 있어, 부산 지역뿐만 아니라 한국 신학계 전체에서 이 주제의 권위자로 인정받고 있습니다.

---

# you asked

message time: 2026-05-10 22:09:38

또한 누구가 있을까/

---

# gemini response

앞서 언급해 드린 박영돈, 최승락 교수님 외에도 부산 지역(특히 고신대학교와 그 학풍을 공유하는 연구자들)에서 **'그리스도의 믿음(*pistis Christou*)'**과 **'칭의의 포괄성'**을 학술적으로 깊이 파고드는 분들이 더 계십니다.`;
    inputEl.value = sample;
    setStatus('statusSampleLoaded');
  });

  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    localStorage.setItem('qa-formatter-lang', currentLang);
    applyLanguage();
  });

  applyLanguage();
});
