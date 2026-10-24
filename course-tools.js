/* Shared classroom helpers: copy validation and cross-tab sync of the three credential fields. */
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
    if (message) { alert(message); return false; }
    return true;
  };
  document.addEventListener('DOMContentLoaded', () => {
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
