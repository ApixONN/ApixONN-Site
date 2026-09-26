/* ApixONN — self-serve 14-day trial signup (live preview + provisioning). */
(() => {
  'use strict';
  const APX = window.APX;
  if (!APX) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const START_AR = {
    's.back': 'العودة للموقع', 's.eyebrow': '١٤ يومًا مجانًا · دون بطاقة ائتمان', 's.h1': 'أنشئ مساحة عمل ApixONN الخاصة بك',
    's.sub': 'جميع الوحدات مفعّلة، وعنوان خاص بك، وأنت المسؤول عن النظام. يستغرق الأمر دقيقة تقريبًا.',
    's.st1': 'مساحة العمل', 's.st2': 'حسابك', 's.st3': 'اجعلها لك',
    's.company': 'اسم الشركة', 's.companyPh': 'مثال: أكمي للهندسة', 's.slug': 'عنوان مساحة العمل',
    's.industry': 'القطاع', 's.ind1': 'الخدمات المهنية', 's.ind2': 'الهندسة والاستشارات', 's.ind3': 'المقاولات والإنشاءات', 's.ind4': 'العقارات وإدارة الأملاك',
    's.ind5': 'التجارة والتوزيع', 's.ind6': 'تقنية المعلومات والتوظيف', 's.ind7': 'أخرى', 's.size': 'حجم الفريق',
    's.continue': 'متابعة', 's.back2': 'رجوع', 's.first': 'الاسم الأول', 's.last': 'اسم العائلة', 's.email': 'البريد الإلكتروني للعمل',
    's.emailHint': 'ستسجّل الدخول به — ويصبح حساب المسؤول الخاص بك.', 's.password': 'كلمة المرور',
    's.r1': '٨ أحرف أو أكثر', 's.r2': 'حرف', 's.r3': 'رقم', 's.r4': 'أحرف كبيرة وصغيرة', 's.phone': 'الهاتف', 's.opt': '(اختياري)',
    's.country': 'الدولة', 's.currency': 'العملة الأساسية', 's.lang': 'لغة مساحة العمل', 's.brand': 'لون الهوية',
    's.brandHint': 'يمكنك تغييره في أي وقت من الإعدادات ← الشركة ← الهوية.',
    's.terms': 'أوافق على <a href="privacy.html" target="_blank">سياسة الخصوصية</a> وعلى تلقي رسائل بخصوص تجربتي.',
    's.create': 'أنشئ مساحة عملي', 's.f1': 'دون بطاقة ائتمان', 's.f2': 'كل الوحدات مشمولة', 's.f3': 'إلغاء في أي وقت',
    's.prev': 'مساحة عملك، مباشرة', 's.prevLive': 'تتحدث أثناء الكتابة', 's.pvPlan': 'تجربة · كل الوحدات',
    's.pvN1': 'الرئيسية', 's.pvN2': 'الموارد البشرية', 's.pvN3': 'الرواتب', 's.pvN4': 'المشاريع', 's.pvN5': 'المالية', 's.pvN6': 'العقارات', 's.pvN7': 'الموافقات',
    's.pvK1': 'الموظفون', 's.pvK2': 'مشاريع مفتوحة', 's.pvK3': 'العملة الأساسية', 's.pvGs': 'البداية',
    's.pvT1': 'أنشئ مساحة عملك', 's.pvT2': 'ادعُ فريقك', 's.pvT2e': 'دقيقتان', 's.pvT3': 'أضف الموظفين والعقود', 's.pvT4': 'جهّز دليل الحسابات', 's.pvT4e': 'نقرة واحدة',
    's.pvT5': 'شغّل أول مسير رواتب', 's.pvBtn': 'ادعُ فريقك',
    's.in1': 'الموارد البشرية والرواتب والإجازات', 's.in2': 'المشاريع والجداول الزمنية', 's.in3': 'مالية كاملة بالقيد المزدوج', 's.in4': 'العقارات والمخزون',
    's.in5': 'سير عمل الموافقات', 's.in6': 'بوابة الخدمة الذاتية للموظفين',
    's.fix': 'العودة إلى النموذج', 's.tAddr': 'العنوان', 's.tLogin': 'سجّل الدخول بـ', 's.tTrial': 'تنتهي التجربة', 's.copy': 'نسخ',
    's.open': 'افتح مساحة عملي', 's.hint': 'قد تستغرق زيارتك الأولى بضع ثوانٍ ريثما نصدر شهادة الأمان الخاصة بك.', 's.guide': 'دليل البداية', 's.home': 'العودة إلى apixonn.com',
    'c.QA': 'قطر', 'c.SA': 'السعودية', 'c.AE': 'الإمارات', 'c.KW': 'الكويت', 'c.BH': 'البحرين', 'c.OM': 'عُمان', 'c.JO': 'الأردن', 'c.EG': 'مصر', 'c.IQ': 'العراق', 'c.GB': 'المملكة المتحدة', 'c.US': 'الولايات المتحدة',
  };
  const T = {
    en: {
      hello: (n) => (n ? `Welcome, ${n}` : 'Welcome'), sub: (c) => (c ? `${c} is almost ready.` : 'Let’s get your company set up.'),
      daysLeft: '14 days left', yourCo: 'Your company',
      checking: 'Checking availability…', avail: (d) => `${d} is available`, taken: 'That address is taken.', tryIt: 'Try', reserved: 'That address is reserved — please choose another.',
      invalid: 'Use 3–40 lowercase letters, numbers or hyphens.', offline: 'We’ll confirm availability when you create the workspace.',
      required: 'This field is required.', email: 'Enter a valid email address.', pw: 'Use at least 8 characters with a letter and a number.', terms: 'Please accept to continue.',
      building: (c) => `Building ${c || 'your'} workspace`,
      steps: (d) => [`Reserving ${d}`, 'Creating your company & ledger', 'Setting up roles & approval workflows', 'Configuring payroll, leave & fiscal year', 'Applying your brand', 'Securing your workspace'],
      ready: 'Your workspace is ready', welcome: (n) => `Welcome aboard, ${n}. You’re the administrator.`, copied: 'Copied',
      failed: 'We couldn’t create your workspace.', rate: 'Too many sign-up attempts from this network. Please try again in a little while.',
      network: 'We couldn’t reach our servers. Check your connection and try again — or email info@apixonn.com.',
    },
    ar: {
      hello: (n) => (n ? `أهلًا، ${n}` : 'أهلًا بك'), sub: (c) => (c ? `مساحة ${c} أوشكت أن تكون جاهزة.` : 'لنبدأ إعداد شركتك.'),
      daysLeft: 'متبقٍ ١٤ يومًا', yourCo: 'شركتك',
      checking: 'جارٍ التحقق من التوفر…', avail: (d) => `${d} متاح`, taken: 'هذا العنوان محجوز.', tryIt: 'جرّب', reserved: 'هذا العنوان مخصص — اختر عنوانًا آخر.',
      invalid: 'استخدم من ٣ إلى ٤٠ حرفًا إنجليزيًا صغيرًا أو أرقامًا أو شرطات.', offline: 'سنؤكد التوفر عند إنشاء مساحة العمل.',
      required: 'هذا الحقل مطلوب.', email: 'أدخل بريدًا إلكترونيًا صحيحًا.', pw: 'استخدم ٨ أحرف على الأقل تتضمن حرفًا ورقمًا.', terms: 'يُرجى الموافقة للمتابعة.',
      building: (c) => `جارٍ بناء مساحة ${c || 'عملك'}`,
      steps: (d) => [`حجز ${d}`, 'إنشاء شركتك ودفتر الأستاذ', 'إعداد الأدوار وسير عمل الموافقات', 'ضبط الرواتب والإجازات والسنة المالية', 'تطبيق هويتك', 'تأمين مساحة عملك'],
      ready: 'مساحة عملك جاهزة', welcome: (n) => `أهلًا بك يا ${n}. أنت المسؤول عن النظام.`, copied: 'تم النسخ',
      failed: 'تعذّر إنشاء مساحة العمل.', rate: 'محاولات تسجيل كثيرة من هذه الشبكة. حاول مرة أخرى بعد قليل.',
      network: 'تعذّر الوصول إلى خوادمنا. تحقق من اتصالك وحاول مجددًا — أو راسلنا على info@apixonn.com.',
    },
  };
  const t = (k, ...a) => { const v = (T[APX.lang()] || T.en)[k]; return typeof v === 'function' ? v(...a) : v; };

  APX.extraAR = START_AR;
  if (APX.lang() === 'ar') APX.applyLang('ar');

  const form = $('#trialForm');
  const els = {
    company: $('#company'), slug: $('#slug'), slugState: $('#slugState'), first: $('#first'), last: $('#last'), email: $('#email'),
    password: $('#password'), meter: $('#meter'), country: $('#country'), currency: $('#currency'), terms: $('#terms'),
  };
  const startedAt = Date.now();
  const params = new URLSearchParams(location.search);
  const plan = ['starter', 'professional', 'business'].includes(params.get('plan')) ? params.get('plan') : 'professional';

  /* ------------------------------ slug ------------------------------ */
  const RESERVED = ['www', 'ops', 'api', 'app', 'admin', 'demo', 'dev', 'uat', 'staging', 'ewp', 'mail', 'smtp', 'cdn', 'static', 'assets', 'status', 'docs', 'help', 'support', 'billing', 'portal', 'login', 'auth', 'dashboard', 'apixonn', 'plans', 'dalil', 'test', 'root', 'system', 'www2', 'ftp', 'ns1', 'ns2'];
  const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40).replace(/-+$/g, '');
  const validSlug = (s) => /^[a-z0-9](?:[a-z0-9-]{1,38}[a-z0-9])$/.test(s);
  let slugTouched = false, slugTimer = null, slugReq = 0, slugOk = null;

  function setSlugState(kind, html) {
    els.slugState.className = 'slug-state' + (kind ? ' ' + kind : '');
    els.slugState.innerHTML = html || '';
    els.slug.closest('.field').classList.toggle('err', kind === 'bad');
  }
  const icoOk = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  const icoBad = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';

  async function checkSlug() {
    const s = els.slug.value;
    slugOk = null;
    if (!s) { setSlugState('', ''); return; }
    if (!validSlug(s)) { setSlugState('bad', icoBad + t('invalid')); slugOk = false; return; }
    if (RESERVED.includes(s)) { setSlugState('bad', icoBad + t('reserved')); slugOk = false; return; }
    setSlugState('', '<span class="spinner"></span>' + t('checking'));
    const id = ++slugReq;
    try {
      const res = await fetch(`${APX.api}/public/slug-available?slug=${encodeURIComponent(s)}`, { headers: { Accept: 'application/json' } });
      if (id !== slugReq) return;
      const d = await res.json().catch(() => null);
      if (!res.ok || !d) throw new Error('bad');
      if (d.available) { setSlugState('ok', icoOk + t('avail', `${s}.${APX.tenantDomain}`)); slugOk = true; }
      else {
        slugOk = false;
        const sug = d.suggestion ? ` ${t('tryIt')} <button type="button" data-sug="${d.suggestion}">${d.suggestion}</button>?` : '';
        setSlugState('bad', icoBad + (d.reason === 'reserved' ? t('reserved') : d.reason === 'invalid' ? t('invalid') : t('taken')) + sug);
      }
    } catch (e) {
      if (id !== slugReq) return;
      slugOk = null; // unknown — the server re-checks on submit
      setSlugState('', t('offline'));
    }
  }
  function queueSlugCheck() { clearTimeout(slugTimer); slugTimer = setTimeout(checkSlug, 380); }

  els.company.addEventListener('input', () => {
    if (!slugTouched) { els.slug.value = slugify(els.company.value); queueSlugCheck(); }
    renderPreview();
  });
  els.slug.addEventListener('input', () => {
    slugTouched = true;
    const clean = els.slug.value.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-+/, '').slice(0, 40);
    if (clean !== els.slug.value) els.slug.value = clean;
    queueSlugCheck();
    renderPreview();
  });
  els.slugState.addEventListener('click', (e) => {
    const b = e.target.closest('[data-sug]');
    if (!b) return;
    els.slug.value = b.dataset.sug; slugTouched = true; checkSlug(); renderPreview();
  });

  /* --------------------------- password ---------------------------- */
  function pwScore(p) {
    const r = { len: p.length >= 8, letter: /[A-Za-z]/.test(p), num: /\d/.test(p), mix: /[a-z]/.test(p) && /[A-Z]/.test(p) };
    $$('[data-rule]').forEach((el) => el.classList.toggle('ok', r[el.dataset.rule]));
    let s = 0;
    if (p.length) s = 1;
    if (r.len && r.letter && r.num) s = 2;
    if (s === 2 && (r.mix || /[^A-Za-z0-9]/.test(p))) s = 3;
    if (s === 3 && p.length >= 12 && r.mix) s = 4;
    els.meter.dataset.s = String(s);
    return r.len && r.letter && r.num;
  }
  els.password.addEventListener('input', () => pwScore(els.password.value));
  $('[data-eye]').addEventListener('click', (e) => {
    const show = els.password.type === 'password';
    els.password.type = show ? 'text' : 'password';
    e.currentTarget.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });

  /* ------------------------- country / brand ----------------------- */
  const tz = { QA: 'Asia/Qatar', SA: 'Asia/Riyadh', AE: 'Asia/Dubai', KW: 'Asia/Kuwait', BH: 'Asia/Bahrain', OM: 'Asia/Muscat', JO: 'Asia/Amman', EG: 'Africa/Cairo', IQ: 'Asia/Baghdad', GB: 'Europe/London', US: 'America/New_York' };
  els.country.addEventListener('change', () => {
    const cur = els.country.selectedOptions[0].dataset.cur;
    if (cur) els.currency.value = cur;
    renderPreview();
  });
  els.currency.addEventListener('change', renderPreview);
  const custom = $('#customColor');
  custom.addEventListener('input', () => {
    $$('input[name="primary_color"]').forEach((r) => { r.checked = false; });
    custom.dataset.active = '1';
    custom.parentElement.style.background = custom.value;
    renderPreview();
  });
  $$('input[name="primary_color"]').forEach((r) => r.addEventListener('change', () => { custom.dataset.active = ''; custom.parentElement.style.background = ''; renderPreview(); }));
  const brandColor = () => (custom.dataset.active ? custom.value : ($('input[name="primary_color"]:checked') || {}).value || '#1d194c');

  /* --------------------------- live preview ------------------------- */
  const ws = $('#ws');
  function trialEnds() {
    const d = new Date(Date.now() + 14 * 864e5);
    return d.toLocaleDateString(APX.lang() === 'ar' ? 'ar' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function renderPreview() {
    const co = els.company.value.trim();
    const first = els.first.value.trim();
    $('#pvCo').textContent = co || t('yourCo');
    $('#pvAv').textContent = (co || 'A').trim().charAt(0).toUpperCase();
    $('#pvSlug').textContent = els.slug.value || 'your-company';
    $('#pvHello').textContent = t('hello', first);
    $('#pvSub').textContent = t('sub', co);
    $('#pvTrial').textContent = t('daysLeft');
    $('#pvCur').textContent = els.currency.value;
    ws.style.setProperty('--brand', brandColor());
  }
  [els.first, els.last].forEach((el) => el.addEventListener('input', renderPreview));
  APX.onLang(() => { renderPreview(); if (els.slug.value) checkSlug(); });

  /* ------------------------------ steps ----------------------------- */
  let step = 1;
  function goto(n) {
    step = n;
    $$('.s-step').forEach((s) => { s.hidden = Number(s.dataset.step) !== n; });
    $$('.stepper .st').forEach((s) => {
      const k = Number(s.dataset.st);
      s.classList.toggle('done', k < n);
      s.classList.toggle('cur', k === n);
    });
    const first = $(`.s-step[data-step="${n}"] input:not([type=radio]):not(.hp), .s-step[data-step="${n}"] select`);
    if (first) setTimeout(() => first.focus({ preventScroll: true }), 50);
    const top = $('.s-form').getBoundingClientRect().top + window.scrollY - 80;
    if (window.scrollY > top) window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  }
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const err = (el, m) => APX.fieldError(el, m);

  function validate(n) {
    let ok = true;
    const need = (el, cond, msg) => { if (!cond) { err(el, msg); ok = false; } else err(el, ''); };
    if (n === 1) {
      need(els.company, els.company.value.trim().length >= 2, t('required'));
      if (!els.slug.value) { setSlugState('bad', icoBad + t('required')); ok = false; }
      else if (!validSlug(els.slug.value)) { setSlugState('bad', icoBad + t('invalid')); ok = false; }
      else if (RESERVED.includes(els.slug.value)) { setSlugState('bad', icoBad + t('reserved')); ok = false; }
      else if (slugOk === false) ok = false;
    }
    if (n === 2) {
      need(els.first, els.first.value.trim(), t('required'));
      need(els.last, els.last.value.trim(), t('required'));
      const ev = els.email.value.trim();
      need(els.email, ev && emailOk(ev), ev ? t('email') : t('required'));
      need(els.password, pwScore(els.password.value), t('pw'));
    }
    if (n === 3) need(els.terms, els.terms.checked, t('terms'));
    if (!ok) { const f = $(`.s-step[data-step="${n}"] .field.err input, .s-step[data-step="${n}"] .field.err select`); if (f) f.focus(); }
    return ok;
  }
  $$('[data-next]').forEach((b) => b.addEventListener('click', () => { if (validate(step)) goto(step + 1); }));
  $$('[data-prev]').forEach((b) => b.addEventListener('click', () => goto(step - 1)));
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && step < 3 && e.target.tagName === 'INPUT') { e.preventDefault(); if (validate(step)) goto(step + 1); }
  });

  /* --------------------------- provisioning ------------------------- */
  const prov = $('#prov');
  const provList = $('#provList');
  function openProv() {
    const d = `${els.slug.value}.${APX.tenantDomain}`;
    $('#provTitle').textContent = t('building', els.company.value.trim());
    $('#provSub').textContent = d;
    provList.innerHTML = t('steps', d).map((s) => `<li><span class="ic"><svg><use href="#i-check"/></svg></span><span>${s}</span></li>`).join('');
    $('#provErr').hidden = true;
    prov.classList.remove('done');
    prov.classList.add('open');
    prov.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeProv() {
    prov.classList.remove('open', 'done');
    prov.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  /** Animate the checklist; resolves when every item has ticked (or halts on failure). */
  function runSteps(signal) {
    const items = $$('li', provList);
    const per = reduced ? 60 : 720;
    return new Promise((resolve) => {
      let i = 0;
      const tick = () => {
        if (signal.failed) return resolve(false);
        if (i > 0) { items[i - 1].classList.remove('run'); items[i - 1].classList.add('ok'); }
        if (i === items.length) return resolve(true);
        // hold the last step until the server has answered
        if (i === items.length - 1 && !signal.done) { items[i].classList.add('run'); return setTimeout(tick, 250); }
        items[i].classList.add('run');
        i += 1;
        setTimeout(tick, per);
      };
      tick();
    });
  }
  $('[data-prov-back]').addEventListener('click', () => closeProv());

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    for (const n of [1, 2, 3]) { if (!validate(n)) { goto(n); return; } }
    const errBox = form.querySelector('.form-err');
    errBox.classList.remove('show');
    const fd = new FormData(form);
    const payload = {
      company_name: els.company.value.trim(),
      slug: els.slug.value,
      industry: fd.get('industry'),
      team_size: fd.get('team_size'),
      first_name: els.first.value.trim(),
      last_name: els.last.value.trim(),
      email: els.email.value.trim(),
      password: els.password.value,
      country: els.country.value,
      currency: els.currency.value,
      timezone: tz[els.country.value] || 'UTC',
      language: fd.get('language') || 'en',
      primary_color: brandColor(),
      plan,
      accept_terms: true,
      website: fd.get('website') || '',
      elapsed_ms: Date.now() - startedAt,
    };
    payload.phone = ($('#phone').value || '').trim() || undefined;

    openProv();
    const signal = { done: false, failed: false };
    const anim = runSteps(signal);
    const r = await APX.postJSON('/public/trial-signup', payload);
    signal.done = true;

    if (!r.ok) {
      signal.failed = true;
      await anim;
      $$('li.run', provList).forEach((li) => li.classList.remove('run'));
      let msg = r.status === 429 ? t('rate') : r.status === 0 ? t('network') : ((r.data && r.data.message) || t('failed'));
      if (r.status === 422 && r.data && r.data.errors) {
        const errs = r.data.errors;
        const map = { company_name: els.company, first_name: els.first, last_name: els.last, email: els.email, password: els.password, accept_terms: els.terms };
        let target = 3;
        Object.entries(errs).forEach(([k, v]) => {
          const m = Array.isArray(v) ? v[0] : String(v);
          if (k === 'slug') { setSlugState('bad', icoBad + m); slugOk = false; target = Math.min(target, 1); }
          else if (map[k]) { err(map[k], m); target = Math.min(target, ['company_name'].includes(k) ? 1 : ['first_name', 'last_name', 'email', 'password'].includes(k) ? 2 : 3); }
        });
        msg = Object.values(errs).map((v) => (Array.isArray(v) ? v[0] : v)).join(' ');
        $('#provErrMsg').textContent = msg;
        $('#provErr').hidden = false;
        $('[data-prov-back]').onclick = () => { closeProv(); goto(target); };
        return;
      }
      $('#provErrMsg').textContent = msg;
      $('#provErr').hidden = false;
      $('[data-prov-back]').onclick = () => closeProv();
      return;
    }

    await anim;
    const d = (r.data && r.data.data) || {};
    const url = d.portal_url || `https://${payload.slug}.${APX.tenantDomain}`;
    const loginUrl = d.login_url || `${url}/login`;
    $('#readyTitle').textContent = t('ready');
    $('#readySub').textContent = t('welcome', payload.first_name);
    $('#tUrl').textContent = url.replace(/^https?:\/\//, '');
    $('#tEmail').textContent = d.login_email || payload.email;
    const ends = d.trial_ends_at ? new Date(d.trial_ends_at) : new Date(Date.now() + 14 * 864e5);
    $('#tEnds').textContent = ends.toLocaleDateString(APX.lang() === 'ar' ? 'ar' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    $('#openWs').href = loginUrl;
    prov.classList.add('done');
    try { form.reset(); } catch (x) { /* ignore */ }
  });

  $('[data-copy]').addEventListener('click', async (e) => {
    const txt = 'https://' + $('#tUrl').textContent;
    try { await navigator.clipboard.writeText(txt); e.currentTarget.textContent = t('copied'); } catch (x) { /* clipboard blocked */ }
  });

  /* ------------------------------ init ------------------------------ */
  const pre = (params.get('slug') || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40);
  if (pre) { els.slug.value = pre; slugTouched = true; checkSlug(); }
  renderPreview();
})();
