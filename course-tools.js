/* Shared classroom controls. Only the three credential fields are cleared. */
(() => {
  const key = 'vibe-course-inputs';
  const secretIds = ['line_channel_secret', 'line_access_token', 'gemini_api_key'];
  const required = {
    faq_ai_prompt: ['my_theme', 'my_info'],
    day1_build_prompt: ['my_faq', ...secretIds],
    system_prompt_output: ['line_channel_id', 'line_admin_uid', ...secretIds, 'my_faq', 'product_fields', 'order_fields', 'admin_notify_tpl', 'user_notify_tpl'],
    line_credentials_copy: ['line_channel_secret', 'line_access_token', 'line_admin_uid']
  };
  const label = id => document.querySelector(`label[for="${id}"]`)?.textContent || id;
  window.courseValidateCopy = id => {
    const missing = (required[id] || []).filter(field => !document.getElementById(field)?.value.trim());
    let message = missing.length ? `請先填寫：${missing.map(label).join('、')}。` : '';
    if (!message && id === 'system_prompt_output') {
      if (!/^\d+$/.test(document.getElementById('line_channel_id').value.trim())) message = 'Channel ID 應為數字，請確認沒有貼成 Secret。';
      else if (!/^U[0-9a-f]{32}$/i.test(document.getElementById('line_admin_uid').value.trim())) message = '管理員 User ID 應為 U 開頭、共 33 碼。';
    }
    if (!message && !document.getElementById(id)?.value.trim()) message = '這一格還沒有內容，請先完成前面的步驟。';
    const status = document.getElementById('course-status');
    status.textContent = message;
    if (message) { status.scrollIntoView({block: 'center'}); return false; }
    return true;
  };
  document.addEventListener('DOMContentLoaded', () => {
    // Mask single-line keys while retaining the shared DAY 1 / DAY 2 field IDs.
    secretIds.forEach(id => {
      const old = document.getElementById(id);
      if (!old) return;
      if (old.tagName === 'TEXTAREA') {
        const input = document.createElement('input');
        input.id = old.id; input.placeholder = old.placeholder; input.value = old.value;
        input.type = 'password'; input.autocomplete = 'off'; old.replaceWith(input);
      } else { old.type = 'password'; old.autocomplete = 'off'; }
    });
    const box = document.createElement('aside');
    box.className = 'course-controls';
    box.innerHTML = '<p>資料只會在同一瀏覽器設定檔、同一網站網址下帶入；請另存 FAQ。憑證暫存在這台電腦，複製的整合提示詞仍會包含憑證。</p><button type="button" id="clear-course-secrets">清除本機教材中的三個憑證</button><p id="course-status" role="status" aria-live="polite"></p>';
    document.querySelector('.main-content').before(box);
    document.getElementById('clear-course-secrets').addEventListener('click', () => {
      let data;
      try {
        data = JSON.parse(localStorage.getItem(key) || '{}');
        secretIds.forEach(id => delete data[id]);
        localStorage.setItem(key, JSON.stringify(data));
      } catch (err) {
        document.getElementById('course-status').textContent = '瀏覽器未允許清除儲存資料，請到網站設定清除本網站資料；那也會清除 FAQ，請先另存。';
        return;
      }
      secretIds.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
      window.refreshCourseOutputs();
      document.getElementById('course-status').textContent = '本機教材憑證已清除，FAQ 和規格保留。AI 對話、剪貼簿及 .dev.vars 不會一起清除；仍須完成金鑰更換。';
    });
    window.addEventListener('storage', e => {
      if (e.key !== key) return;
      try {
        const data = JSON.parse(e.newValue || '{}');
        secretIds.forEach(id => { const el = document.getElementById(id); if (el) el.value = data[id] || ''; });
        window.refreshCourseOutputs();
      } catch (err) { /* Ignore unrelated malformed storage data. */ }
    });
  });
})();
