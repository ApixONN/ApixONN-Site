/* ApixONN marketing site — interactions + EN/AR i18n.
   English lives in the HTML (renders without JS); Arabic swaps in from AR. */
(() => {
  'use strict';

  const CONFIG = {
    tenantDomain: 'dev.apixonn.com',
    api: 'https://ops.dev.apixonn.com/api/v1',
  };
  window.APX = CONFIG;

  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ------------------------------------------------------------------ */
  /* Arabic dictionary                                                   */
  /* ------------------------------------------------------------------ */
  const AR = {
    'top.pill': 'جديد',
    'top.text': 'ابدأ تجربة مجانية لمدة ١٤ يومًا — مساحة عملك جاهزة في أقل من دقيقة.',
    'top.link': 'احجز مساحتك ←',
    'nav.platform': 'المنصّة', 'nav.ledger': 'كيف يعمل', 'nav.gulf': 'مصمَّم للخليج', 'nav.pricing': 'الأسعار', 'nav.docs': 'التوثيق',
    'cta.demo': 'احجز عرضًا توضيحيًا', 'cta.trialShort': 'ابدأ التجربة المجانية', 'cta.trial': 'ابدأ تجربة مجانية ١٤ يومًا',
    'hero.badge': 'صُنع في قطر',
    'hero.badgeText': 'نظام ERP متكامل للخليج — بالعربية والإنجليزية',
    'hero.h1': 'شركتك بالكامل،<br><span class="serif grad-text">في دفتر أستاذ واحد.</span>',
    'hero.sub': 'الموارد البشرية والرواتب والمشاريع والمالية والمخزون والعقارات — نظام واحد، وقاعدة بيانات واحدة، ومصدر حقيقة واحد. كل عملية تُرحَّل إلى الدفتر لحظة حدوثها، فلا تبقى أرقامك رهينة جدول بيانات.',
    'hero.n1': 'دون بطاقة ائتمان', 'hero.n2': 'جاهز خلال دقائق لا أشهر', 'hero.n3': 'عربي وإنجليزي، باتجاه أصيل من اليمين لليسار',
    'app.live': 'دفتر مباشر',
    'app.t1': 'نظرة عامة', 'app.t2': 'الرواتب', 'app.t3': 'المشاريع', 'app.t4': 'المالية', 'app.t5': 'العقارات',
    'app.ov.h': 'صباح الخير يا مريم', 'app.ov.s': 'سبتمبر ٢٠٢٦ · ر.ق',
    'app.k1': 'الإيرادات (الشهر حتى الآن)', 'app.k2': 'هامش الربح الإجمالي', 'app.k3': 'تكلفة الرواتب', 'app.k4': 'النقد المتاح',
    'app.lg1': 'الإيرادات', 'app.lg2': 'التكاليف',
    'app.r1': 'مطالبة مصروفات · عمر خ.', 'app.r1s': 'سفر · الدوحة ← الرياض', 'app.wait': 'بانتظارك',
    'app.r2': 'أمر شراء PO-0412', 'app.r2s': 'الخطوة ٢ من ٣ · المالية', 'app.inrev': 'قيد المراجعة',
    'app.pr.h': 'رواتب سبتمبر · ١٤٢ موظفًا',
    'app.pr.s1': 'مسودة', 'app.done': 'تم', 'app.pr.s2': 'محسوبة', 'app.pr.s3': 'الاعتماد', 'app.pr.s3v': 'المدير المالي · ٢ من ٢', 'app.pr.s4': 'الترحيل والدفع', 'app.pr.s4v': 'ملف البنك جاهز',
    'app.pr.r1': 'مهندسة أولى · المشاريع', 'app.pr.r2': 'مدير مشروع · التنفيذ', 'app.pr.r3': 'محاسبة · المالية', 'app.pr.r4': 'مشرف موقع · العمليات',
    'app.ready': 'جاهز', 'app.review': 'مراجعة',
    'app.pj.h': 'المشاريع النشطة · الهامش لكل مشروع', 'app.pj.s': 'نسبة الاستغلال ٨٤٪',
    'app.pj.fx': 'انخفض هامش مشروع فيلا اللؤلؤة إلى <b>٩٪</b> — ٢١٢ ساعة غير مفوترة هذا الشهر. الجداول الزمنية انعكست على تكلفته تلقائيًا.',
    'app.fi.h': 'الأرباح والخسائر · الربع الثالث ٢٠٢٦', 'app.fi.s': 'العملة الأساسية · ر.ق',
    'app.fi.c1': 'الحساب', 'app.fi.c2': 'الربع ٣ ٢٠٢٦', 'app.fi.c3': 'الربع ٢ ٢٠٢٦',
    'app.fi.r1': 'الإيرادات', 'app.fi.r2': 'تكلفة الخدمات', 'app.fi.r3': 'المصروفات التشغيلية', 'app.fi.r4': 'صافي الربح',
    'app.fi.fx': 'الفاتورة INV-0233 صدرت بمبلغ <b>١٠٬٠٠٠ دولار</b> ورُحِّلت بقيمة <b>٣٦٬٤٠٠ ر.ق</b> بسعر ٣٫٦٤٠٠ — وتظهر بعملتك الأساسية تلقائيًا.',
    'app.pp.h': 'البرج B · ٦٠ وحدة', 'app.pp.s': 'نسبة الإشغال ٩٢٪',
    'app.pp.k1': 'الإيجار المحصَّل', 'app.pp.k2': 'شيكات مستحقة', 'app.pp.k3': 'عقود تنتهي', 'app.pp.k4': 'طلبات صيانة',
    'app.pp.l1': 'مشغولة', 'app.pp.l2': 'عقد ينتهي', 'app.pp.l3': 'شاغرة',
    'tape.h': 'دفتر الأستاذ العام', 'tape.s': 'ترحيل تلقائي', 'tape.bal': 'المدين = الدائن', 'tape.ok': 'متوازن ✓',
    'mq.label': 'مصمَّم لطريقة عمل شركات الخليج فعلًا',
    'mq.1': 'العقارات وإدارة الأملاك', 'mq.2': 'الهندسة والاستشارات', 'mq.3': 'التجارة والتوزيع', 'mq.4': 'الخدمات المهنية',
    'mq.5': 'المقاولات والأعمال الكهروميكانيكية', 'mq.6': 'المجموعات متعددة الشركات', 'mq.7': 'إدارة المرافق', 'mq.8': 'تقنية المعلومات والتوظيف',
    'why.eyebrow': 'لماذا ApixONN',
    'why.h2': 'نظام واحد حيث يحتاج الآخرون <span class="serif">إلى عشر إضافات.</span>',
    'why.sub': 'معظم الشركات تعمل على خليط متفرق: تطبيق للرواتب، وأداة للجداول الزمنية، وبرنامج محاسبة، وجداول للموارد البشرية، وموافقات تضيع في البريد. كل انتقال بينها نقطة تنحرف عندها الأرقام.',
    'why.before': 'قبل', 'why.beforeSub': 'ثماني أدوات، وثمانية حسابات دخول، ولا مصدر واحد للحقيقة.',
    'why.c1': 'تطبيق الرواتب', 'why.c2': 'جدول الموارد البشرية', 'why.c3': 'برنامج المحاسبة', 'why.c4': 'أداة الجداول الزمنية',
    'why.c5': 'موافقات عبر البريد', 'why.c6': 'أداة إدارة المشاريع', 'why.c7': 'دفتر الإيجارات في Excel', 'why.c8': 'جدول المخزون',
    'why.after': 'مع ApixONN', 'why.afterSub': 'كل وحدة تكتب في الدفتر نفسه، لحظيًا.', 'why.afterSmall': 'دخول واحد · قاعدة بيانات واحدة · دون وصلات',
    'm.hr': 'الموارد البشرية والرواتب', 'm.proj': 'المشاريع', 'm.fin': 'المالية', 'm.wf': 'الموافقات', 'm.prop': 'العقارات', 'm.inv': 'المخزون',
    'why.f1': 'دقائق', 'why.f1s': 'حتى تصبح مساحتك جاهزة', 'why.f2': 'دفتر واحد', 'why.f2s': 'لكل الوحدات', 'why.f3': '٠ $', 'why.f3s': 'رسوم منصة',
    'st.1': 'وحدات متكاملة في قاعدة بيانات واحدة', 'st.2': 'لغتان، مع دعم كامل للاتجاه من اليمين لليسار', 'st.3u': 'يومًا', 'st.3': 'تجربة مجانية — دون بطاقة ائتمان', 'st.4u': 'مستخدمين', 'st.4': 'مشمولون في كل باقة',
    'pl.eyebrow': 'المنصّة',
    'pl.h2': 'كل ما تقوم عليه أعمالك. <span class="serif grad-text">لا شيء مُلحق من الخارج.</span>',
    'pl.sub': 'ثماني وحدات صُممت معًا — فيتحول الجدول الزمني المعتمد إلى تكلفة مشروع وبند رواتب وقيد يومية دون أن يعيد أحد إدخاله.',
    'b.fin.t': 'المالية والمحاسبة',
    'b.fin.p': 'محاسبة حقيقية بالقيد المزدوج: دليل الحسابات، والذمم المدينة والدائنة، والفواتير وأوامر الشراء، والتسويات البنكية، والموازنات، والأصول الثابتة، وضريبة القيمة المضافة، وقوائم مالية ترتبط دائمًا بالدفتر.',
    'b.fin.exp': 'التكاليف والمصروفات',
    'b.fin.c1': 'ميزان المراجعة', 'b.fin.c2': 'الميزانية العمومية', 'b.fin.c3': 'التدفقات النقدية', 'b.fin.c4': 'إقفال الفترات',
    'b.guide': 'اقرأ الدليل',
    'b.pay.t': 'الموارد البشرية والرواتب',
    'b.pay.p': 'الموظفون والعقود والدرجات والإجازات والحضور — مع محرك رواتب يطبّق الأنظمة المحلية، والسلف، ومكافأة نهاية الخدمة، وملفات الدفع البنكية.',
    'b.pay.l1': 'الأساسي والبدلات', 'b.pay.l2': 'قسط سلفة', 'b.pay.l3': 'إجازة بدون راتب (يوم)', 'b.pay.l4': 'صافي الراتب',
    'b.proj.t': 'المشاريع والموارد', 'b.proj.p': 'المراحل والإنجازات والمخاطر والموازنات والتخصيص والقيمة المكتسبة — مع احتساب تكلفة الموارد غير المستغلة ونسبة الاستغلال.',
    'b.wf.t': 'سير العمل والموافقات', 'b.wf.p': 'سلاسل موافقة متعددة المستويات مع التفويض والفصل بين المهام.', 'b.wf.l1': 'المدير', 'b.wf.l2': 'المدير المالي',
    'b.prop.t': 'العقارات', 'b.prop.p': 'المحافظ والوحدات والعقود والتأمينات والشيكات المؤجلة والصيانة وكشوف الملّاك.',
    'b.inv.t': 'المخزون والمشتريات', 'b.inv.p': 'المنتجات والموردون وأوامر الشراء واستلام البضائع وصرفها — وكل حركة مُقيَّمة في الدفتر.', 'b.inv.s1': 'كابلات', 'b.inv.s2': 'لوحات',
    'b.sales.t': 'العملاء والمبيعات', 'b.sales.p': 'العملاء ومسار الفرص البيعية وبيانات العمل التي ترتبط بها المشاريع والفواتير.', 'b.sales.f1': 'محتملون', 'b.sales.f2': 'عروض', 'b.sales.f3': 'مكتسبة',
    'b.rep.t': 'التقارير ولوحات المؤشرات', 'b.rep.p': 'القوائم المالية وتحليلات الموارد البشرية والرواتب والمشاريع والموارد — كل رقم مطابق للدفتر، مع التصفية حسب الشركة أو الفرع أو المشروع أو مركز التكلفة.',
    'b.rep.c1': 'عدد الموظفين والدوران', 'b.rep.c2': 'خريطة الاستغلال', 'b.rep.c3': 'ربحية المشروع', 'b.rep.c4': 'سجل الرواتب', 'b.rep.c5': 'أعمار الذمم المدينة',
    'lg.eyebrow': 'كيف يعمل',
    'lg.h2': 'سجّل ساعة عمل. <span class="serif grad-text">وشاهدها تصل إلى قائمة الدخل.</span>',
    'lg.sub': 'لأن كل الوحدات تتشارك دفترًا واحدًا، فإن أي عمل يُنجز في الشركة يصل إلى حساباتك من تلقاء نفسه — بدقة، وبعملتك الأساسية، ومع سجل تدقيق كامل.',
    'lg.n1': 'تسجيل الساعات', 'lg.n1p': 'يرسل الموظف جدوله الأسبوعي من البوابة.', 'lg.n1v': '٤٠ ساعة · Atlas HQ',
    'lg.n2': 'الاعتماد', 'lg.n2p': 'تعتمده سلسلة المدراء — ولا أحد يعتمد طلبه بنفسه.', 'lg.n2v': 'اعتمادان من ٢',
    'lg.n3': 'تكلفة المشروع', 'lg.n3p': 'تُحمَّل تكلفته الفعلية على موازنة المشروع وهامشه.',
    'lg.n4': 'ترحيل القيد', 'lg.n4p': 'ترحّل الرواتب قيدًا متوازنًا إلى دفتر الأستاذ.', 'lg.n4v': 'مدين = دائن ✓',
    'lg.n5': 'تحديث قائمة الدخل', 'lg.n5p': 'تعكس القوائم المالية وربحية المشروع ذلك — لحظيًا.', 'lg.n5v': 'لحظيًا',
    'lg.story': '<b>لا تصدير، ولا إعادة إدخال، ولا مفاجآت في نهاية الشهر.</b> القيود المرحّلة غير قابلة للتعديل، ويمكن إقفال الفترات، وأي تصحيح يتم بقيد عكسي مرتبط — فيرى المدقق بالضبط ما الذي تغيّر، ومن غيّره، ومتى.',
    'gf.eyebrow': 'مصمَّم للخليج', 'gf.h2': 'محلي في تصميمه، <span class="serif grad-text">لا في ترجمته فقط.</span>',
    'gf.sub': 'بُني في قطر لطريقة عمل الشركات في المنطقة — عربية تُقرأ بشكل صحيح، وعملات تُحوَّل بدقة، ورواتب تعرف الأنظمة.',
    'gf.c1': 'العربية من اليمين لليسار', 'gf.c1p': 'تنقلب الواجهة كاملة إلى تخطيط عربي أصيل — لا ترجمة لاحقة.',
    'gf.c2': 'دفتر متعدد العملات', 'gf.c2p': 'أصدر الفواتير بأي عملة — وتُحوَّل بسعرك وتظهر بعملتك الأساسية.',
    'gf.c3': 'رواتب وفق الأنظمة', 'gf.c3p': 'قواعد كل دولة مدمجة — الضرائب والتأمينات الاجتماعية تُحتسب لكل موظف حسب دولته.',
    'gf.si1': 'الأردن · حصة الموظف', 'gf.si2': 'الأردن · حصة صاحب العمل',
    'gf.c4': 'ضريبة القيمة المضافة', 'gf.c4p': 'نسب ضريبية قابلة للإعداد على المبيعات والمشتريات، مع إقرار ضريبي مبني على الدفتر.',
    'gf.c5': 'ملفات الدفع البنكية', 'gf.c5p': 'اعتمد الرواتب وأنشئ ملف البنك في خطوة واحدة — دون إعادة كتابة الرواتب.',
    'gf.c6': 'نهاية الخدمة', 'gf.c6p': 'مكافأة نهاية الخدمة والتسويات النهائية تُحتسب من سجل الخدمة، لا من جدول بيانات.',
    'gf.c7': 'شركات وفروع متعددة', 'gf.c7p': 'أدِر عدة كيانات قانونية في مساحة عمل واحدة — لكلٍّ عملته ودليل حساباته وهويته، مع عزل البيانات لكل شركة والتبديل بينها بنقرة.',
    'ct.eyebrow': 'الرقابة والتدقيق', 'ct.h2': 'رقابة بمستوى المؤسسات، <span class="serif">دون تعقيدها.</span>',
    'ct.c1': 'أدوار وصلاحيات دقيقة', 'ct.c1p': 'حدّد بدقة من يمكنه العرض أو الإنشاء أو الاعتماد أو الترحيل — لكل وحدة ولكل شركة.',
    'ct.c2': 'الفصل بين المهام', 'ct.c2p': 'لا أحد يعتمد طلبه بنفسه. سلاسل متعددة المستويات مع التفويض أثناء الغياب.',
    'ct.c3': 'دفاتر مقفلة غير قابلة للتعديل', 'ct.c3p': 'القيود المرحّلة لا تُعدَّل، والفترات المقفلة لا تُمس، وكل تصحيح قابل للتتبع.',
    'ct.a1': 'رحّلت القيد JE-2026-1185 · رواتب سبتمبر', 'ct.a2': 'اعتمد مسير الرواتب PAY-2026-09 (الخطوة ٢ من ٢)',
    'ct.a3': 'أرسل جدولًا زمنيًا · الأسبوع ٣٨ · ٤٠ ساعة', 'ct.a4': 'أقفل الفترة المحاسبية أغسطس ٢٠٢٦',
    'ct.posted': 'مُرحَّل', 'ct.approved': 'معتمد', 'ct.submitted': 'مُرسَل', 'ct.locked': 'مُقفَل',
    'ep.eyebrow': 'بوابة الموظفين', 'ep.h2': 'موظفوك <span class="serif grad-text">يخدمون أنفسهم.</span>',
    'ep.sub': 'يحصل كل موظف على بوابة خدمة ذاتية واضحة — فلا تبقى الموارد البشرية مكتب مساعدة.',
    'ep.l1': 'الجداول الزمنية الأسبوعية', 'ep.l1p': 'سجّل الساعات على المشاريع؛ والموافقات تُوجَّه تلقائيًا.',
    'ep.l2': 'الإجازات والطلبات', 'ep.l2p': 'الأرصدة والطلبات وخطابات الموارد البشرية — متابعة من البداية للنهاية.',
    'ep.l3': 'قسائم الرواتب والمستندات', 'ep.l3p': 'نزّل قسائم الراتب، وارفع المستندات، وتابع المهام.',
    'ep.cta': 'استكشف دليل البوابة',
    'pr.eyebrow': 'الأسعار', 'pr.h2': 'أسعار معلنة. <span class="serif grad-text">دون رسوم منصة.</span>',
    'pr.sub': 'كل باقة تشمل ٣ مستخدمين — وأضف المقاعد متى شئت. ابدأ بتجربة مجانية لكل شيء لمدة ١٤ يومًا.',
    'pr.monthly': 'شهري', 'pr.yearly': 'سنوي',
    'pr.p1t': 'الموارد البشرية الأساسية', 'pr.p1d': 'للفرق الصغيرة التي تنظّم شؤون الموظفين والوقت.', 'pr.mo': '/شهريًا', 'pr.incl': 'تشمل ٣ مستخدمين', 'pr.extra': 'لكل مستخدم إضافي',
    'pr.p1a': 'الموارد البشرية والهيكل والإجازات والحضور', 'pr.p1b': 'الجداول الزمنية والموافقات', 'pr.p1c': 'بوابة الخدمة الذاتية للموظفين', 'pr.p1d2': 'فوترة ومصروفات أساسية',
    'pr.start': 'ابدأ التجربة المجانية', 'pr.pop': 'الأكثر طلبًا',
    'pr.p2t': 'العمليات والمشاريع', 'pr.p2d': 'لفرق الخدمات التي تدير العملاء والمشاريع.',
    'pr.p2a': 'كل ما في Starter', 'pr.p2b': 'المشاريع والموارد والطلب', 'pr.p2c': 'تكلفة الموارد غير المستغلة والاستغلال', 'pr.p2d2': 'مالية كاملة — ذمم ودفتر أستاذ وموازنات', 'pr.p2e': 'محرك سير عمل متعدد المستويات',
    'pr.p3t': 'ERP متكامل', 'pr.p3d': 'للشركات التي تدير الرواتب والمخزون داخليًا.',
    'pr.p3a': 'كل ما في Professional', 'pr.p3b': 'رواتب وفق الأنظمة المحلية', 'pr.p3c': 'المخزون والمشتريات', 'pr.p3d2': 'شركات وعملات متعددة', 'pr.p3e': 'صلاحيات متقدمة وسياسات بيانات',
    'pr.p4t': 'التوسع والتحكم', 'pr.p4d': 'للمجموعات التي تحتاج حوكمة أو دخولًا موحدًا أو استضافة ذاتية.', 'pr.talk': 'لنتحدث', 'pr.p4s': 'تسعير مقاعد بالحجم · كيانات غير محدودة',
    'pr.p4a': 'كل ما في Business', 'pr.p4b': 'شركات وكيانات غير محدودة', 'pr.p4c': 'دخول موحد SSO / SAML وتصدير سجلات التدقيق', 'pr.p4d2': 'استضافة ذاتية أو سحابة خاصة',
    'pr.contact': 'تواصل مع المبيعات',
    'pr.f1': 'تجربة مجانية ١٤ يومًا', 'pr.f2': 'دون بطاقة ائتمان', 'pr.f3': 'إلغاء في أي وقت', 'pr.compare': 'المقارنة الكاملة مع Odoo وDynamics وNetSuite ←',
    'dc.eyebrow': 'التوثيق', 'dc.h2': 'موثَّق بالكامل، <span class="serif">بلغة واضحة.</span>',
    'dc.sub': 'أدلة خطوة بخطوة لكل شاشة — مكتوبة لمن يستخدمونها، لا للمطورين. دون الحاجة لتسجيل الدخول.',
    'dc.d1': 'دليل لوحة تحكم الشركة', 'dc.d1p': 'للموارد البشرية والمالية والرواتب ومدراء المشاريع والمسؤولين.', 'dc.t1': 'البدء', 'dc.t2': 'الإعدادات', 'dc.open': 'افتح الدليل',
    'dc.d2': 'دليل بوابة الموظفين', 'dc.d2p': 'الجداول الزمنية والإجازات والطلبات وقسائم الرواتب والمستندات — لكل موظف.',
    'dc.d3': 'سير العمل والموافقات', 'dc.d3p': 'صمّم سلاسل الموافقة، وفوّض أثناء الغياب، وحافظ على الفصل بين المهام.',
    'dl.sep': 'منتج مستقل',
    'dl.h2': 'إجابات من مستنداتك، <span class="hl">مع الصفحة التي تثبتها.</span>',
    'dl.sub': 'يقرأ دليل أدلتك وعقودك وجداولك ورسائلك، ويجيب عن الأسئلة بعربية أو إنجليزية واضحة — مع الإشارة دائمًا إلى الصفحة التي جاءت منها الإجابة.',
    'dl.note': 'دليل منتج مستقل — يعمل بمفرده، مع أي مستندات.',
    'dl.f1': 'يذكر الصفحة بالضبط', 'dl.f1p': 'كل إجابة مرتبطة بمصدرها.',
    'dl.f2': 'العربية والإنجليزية', 'dl.f2p': 'اسأل بأيٍّ منهما — وتأتيك الإجابة بها.',
    'dl.f3': 'يحترم الصلاحيات', 'dl.f3p': 'لا يرى كل شخص إلا إجابات من الملفات المسموح له بها.',
    'dl.f4': 'الويب وواتساب', 'dl.f4p': 'اسأل من المتصفح أو راسله مباشرة.',
    'dl.cta': 'اطلب الوصول إلى دليل', 'dl.cta2': 'اطرح سؤالًا', 'dl.ask': 'اسأل أي شيء عن مستنداتك…',
    'fq.h2': 'أسئلة، وإجاباتها.',
    'fq.q1': 'ماذا يحدث عندما أبدأ التجربة المجانية؟',
    'fq.a1': 'تحصل على مساحة عمل خاصة بعنوانك — مثل acme.dev.apixonn.com — مع تفعيل جميع الوحدات لمدة ١٤ يومًا. أنت المسؤول: ادعُ فريقك، واستورد بياناتك، واستكشف. دون بطاقة ائتمان.',
    'fq.q2': 'ماذا يحدث عند انتهاء الأيام الأربعة عشر؟',
    'fq.a2': 'اختر باقة للاستمرار. وإن لم تفعل، تصبح المساحة للقراءة فقط — لا يُحذف شيء، ويمكنك الاشتراك لاحقًا لتكمل من حيث توقفت.',
    'fq.q3': 'هل يعمل النظام بالعربية بالكامل فعلًا؟',
    'fq.a3': 'نعم. يستطيع كل مستخدم التبديل بين العربية والإنجليزية، وتنقلب الواجهة إلى تخطيط أصيل من اليمين لليسار — القوائم والجداول والنماذج والتقارير.',
    'fq.q4': 'هل يمكنني إدارة أكثر من شركة؟',
    'fq.a4': 'نعم. يمكن لمساحة عمل واحدة أن تضم عدة شركات وفروع، لكلٍّ عملتها ودليل حساباتها وهويتها. يبدّل المستخدمون بينها بنقرة، وتبقى البيانات معزولة لكل شركة.',
    'fq.q5': 'ما العملات المدعومة؟',
    'fq.a5': 'أي عملة وفق معيار ISO — الريال القطري والسعودي والدرهم الإماراتي والدينار الأردني والدولار واليورو وغيرها. تحدد أسعار الصرف بتاريخ سريانها؛ فتُحوَّل المستندات بالعملات الأجنبية وتظهر كل التقارير بالعملة الأساسية لشركتك.',
    'fq.q6': 'هل يمكننا الانتقال من جداول البيانات أو نظام آخر؟',
    'fq.a6': 'نعم. ابدأ بالأرصدة الافتتاحية وقائمة الموظفين، ثم انقل السجلات التاريخية تدريجيًا. احجز عرضًا توضيحيًا وسنرافق فريقك في خطة الانتقال.',
    'fq.q7': 'هل بياناتنا آمنة؟',
    'fq.a7': 'كل مساحة عمل معزولة، والوصول قائم على الأدوار، والعمليات الحساسة تُسجَّل في سجل تدقيق. ويمكن لعملاء المؤسسات اختيار سحابة خاصة أو استضافة ذاتية.',
    'fq.q8': 'أين أتعلم كيف يعمل كل شيء؟',
    'fq.a8': 'في <a href="https://docs.dev.apixonn.com/" target="_blank" rel="noopener">التوثيق</a> — أدلة خطوة بخطوة لكل شاشة دون تسجيل دخول. وتفاصيل الباقات كاملة في <a href="https://plans.dev.apixonn.com/" target="_blank" rel="noopener">صفحة الأسعار</a>.',
    'fn.eyebrow': '١٤ يومًا مجانًا · دون بطاقة ائتمان',
    'fn.h2': 'احجز مساحة عملك <span class="serif grad-text">في أقل من دقيقة.</span>',
    'fn.sub': 'اختر عنوانك، وسنجهّز لك مساحة ApixONN خاصة مع تفعيل جميع الوحدات.',
    'fn.btn': 'ابدأ مجانًا',
    'fn.hint': 'أو <a href="#demo" data-open-demo style="color:var(--peri)">احجز عرضًا توضيحيًا</a> مع فريقنا.',
    'ft.tag': 'نظام ERP متكامل صُنع في قطر للخليج — الموارد البشرية والرواتب والمشاريع والمالية والمخزون والعقارات في دفتر أستاذ واحد.',
    'ft.product': 'المنتج', 'ft.resources': 'الموارد', 'ft.products': 'منتجاتنا', 'ft.contact': 'تواصل', 'ft.qatar': 'الدوحة، قطر', 'ft.privacy': 'سياسة الخصوصية',
    'ft.copy': '© ٢٠٢٦ ApixONN. جميع الحقوق محفوظة.',
    'dm.h': 'احجز عرضًا توضيحيًا', 'dm.sub': '٣٠ دقيقة مع فريقنا، على إجراءات عملك. نرد خلال يوم عمل واحد.',
    'dm.product': 'أي منتج؟', 'dm.name': 'الاسم الكامل', 'dm.email': 'البريد الإلكتروني للعمل', 'dm.company': 'الشركة', 'dm.phone': 'الهاتف', 'dm.opt': '(اختياري)',
    'dm.size': 'حجم الشركة', 'dm.date': 'التاريخ المفضل', 'dm.interest': 'على ماذا نركّز؟', 'dm.msg': 'هل هناك ما يجب أن نعرفه؟', 'dm.submit': 'اطلب العرض',
    'dm.legal': 'بإرسال النموذج، فإنك توافق على <a href="privacy.html" style="color:var(--peri)">سياسة الخصوصية</a>.',
    'dm.okH': 'تم استلام طلبك', 'dm.okP': 'شكرًا لك — سنتواصل معك خلال يوم عمل واحد لتحديد موعد.', 'dm.close': 'إغلاق',
  };

  const MSG = {
    en: {
      required: 'This field is required.', email: 'Enter a valid email address.', sending: 'Sending…',
      network: 'We couldn’t reach our servers. Please try again, or email us at info@apixonn.com.',
      server: 'Something went wrong on our side. Please try again, or email us at info@apixonn.com.',
      rate: 'Too many attempts. Please wait a few minutes and try again.', justNow: 'just now', posted: 'Posted ✓',
    },
    ar: {
      required: 'هذا الحقل مطلوب.', email: 'أدخل بريدًا إلكترونيًا صحيحًا.', sending: 'جارٍ الإرسال…',
      network: 'تعذّر الوصول إلى خوادمنا. حاول مرة أخرى، أو راسلنا على info@apixonn.com.',
      server: 'حدث خطأ من جهتنا. حاول مرة أخرى، أو راسلنا على info@apixonn.com.',
      rate: 'محاولات كثيرة. انتظر بضع دقائق ثم حاول مجددًا.', justNow: 'الآن', posted: 'مُرحَّل ✓',
    },
  };

  /* ------------------------------------------------------------------ */
  /* i18n engine                                                         */
  /* ------------------------------------------------------------------ */
  let lang = 'en';
  const listeners = [];
  window.APX.onLang = (fn) => listeners.push(fn);
  window.APX.lang = () => lang;
  window.APX.msg = (k) => (MSG[lang] && MSG[lang][k]) || MSG.en[k] || k;

  function applyLang(next, extraDict) {
    lang = next === 'ar' ? 'ar' : 'en';
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const dict = Object.assign({}, AR, extraDict || window.APX.extraAR || {});
    $$('[data-i18n]').forEach((el) => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      const key = el.getAttribute('data-i18n');
      el.innerHTML = lang === 'ar' && dict[key] != null ? dict[key] : el.dataset.en;
    });
    $$('[data-i18n-ph]').forEach((el) => {
      if (el.dataset.enPh === undefined) el.dataset.enPh = el.getAttribute('placeholder') || '';
      const key = el.getAttribute('data-i18n-ph');
      el.setAttribute('placeholder', lang === 'ar' && dict[key] != null ? dict[key] : el.dataset.enPh);
    });
    $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    try { localStorage.setItem('apx_lang', lang); } catch (e) { /* storage unavailable */ }
    listeners.forEach((fn) => fn(lang));
  }
  window.APX.applyLang = applyLang;

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lang]');
    if (b) applyLang(b.dataset.lang);
  });

  /* tenant domain everywhere */
  $$('[data-domain]').forEach((el) => { el.textContent = CONFIG.tenantDomain; });

  /* ------------------------------------------------------------------ */
  /* nav                                                                 */
  /* ------------------------------------------------------------------ */
  const nav = $('#nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  const mm = $('#mm');
  const burger = $('[data-menu-open]');
  function setMenu(open) {
    if (!mm) return;
    mm.classList.toggle('open', open);
    mm.setAttribute('aria-hidden', String(!open));
    if (burger) burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-menu-open]')) setMenu(true);
    else if (e.target.closest('[data-menu-close]') || e.target.closest('[data-menu-link]')) setMenu(false);
  });

  /* ------------------------------------------------------------------ */
  /* hero: product tour + ledger tape                                    */
  /* ------------------------------------------------------------------ */
  const TAPE = {
    seed: [
      { t: { en: 'Vendor bill · Gulf Cables', ar: 'فاتورة مورد · Gulf Cables' }, dr: { en: 'Materials inventory', ar: 'مخزون المواد' }, cr: { en: 'Accounts payable', ar: 'الذمم الدائنة' }, amt: '22,750.00', time: '08:12' },
      { t: { en: 'Receipt · Al Noor Trading', ar: 'سند قبض · النور للتجارة' }, dr: { en: 'Bank — QNB', ar: 'البنك — QNB' }, cr: { en: 'Accounts receivable', ar: 'الذمم المدينة' }, amt: '95,000.00', time: '08:47' },
      { t: { en: 'Depreciation · August', ar: 'إهلاك · أغسطس' }, dr: { en: 'Depreciation expense', ar: 'مصروف الإهلاك' }, cr: { en: 'Accumulated depreciation', ar: 'مجمع الإهلاك' }, amt: '8,400.00', time: '09:05' },
    ],
    overview: { t: { en: 'Sales invoice INV-0231 · Atlas HQ', ar: 'فاتورة مبيعات INV-0231 · Atlas HQ' }, dr: { en: 'Accounts receivable', ar: 'الذمم المدينة' }, cr: { en: 'Revenue — services', ar: 'إيرادات الخدمات' }, amt: '184,500.00' },
    payroll: { t: { en: 'Payroll · September 2026', ar: 'مسير رواتب · سبتمبر ٢٠٢٦' }, dr: { en: 'Salaries expense', ar: 'مصروف الرواتب' }, cr: { en: 'Bank — QNB', ar: 'البنك — QNB' }, amt: '612,400.00' },
    projects: { t: { en: 'Timesheet cost · Atlas HQ · wk 38', ar: 'تكلفة جدول زمني · Atlas HQ · أسبوع ٣٨' }, dr: { en: 'Project cost — Atlas', ar: 'تكلفة المشروع — Atlas' }, cr: { en: 'Accrued payroll', ar: 'رواتب مستحقة' }, amt: '48,960.00' },
    finance: { t: { en: 'INV-0233 · USD 10,000 @ 3.6400', ar: 'INV-0233 · ١٠٬٠٠٠ دولار @ ٣٫٦٤٠٠' }, dr: { en: 'Accounts receivable', ar: 'الذمم المدينة' }, cr: { en: 'Revenue — services', ar: 'إيرادات الخدمات' }, amt: '36,400.00' },
    property: { t: { en: 'Rent · Tower B · Unit 1204', ar: 'إيجار · البرج B · وحدة ١٢٠٤' }, dr: { en: 'Tenant receivable', ar: 'ذمم المستأجرين' }, cr: { en: 'Rental income', ar: 'إيرادات الإيجار' }, amt: '12,000.00' },
  };
  const tapeEl = $('#tape');
  const tapeItems = [];
  let jeNo = 1180;

  function renderTape() {
    if (!tapeEl) return;
    tapeEl.innerHTML = tapeItems.map((it, i) => `
      <div class="je${it.fresh && i === 0 ? ' new' : ''}">
        <div class="je-top"><code>JE-2026-${it.no}</code><em>${it.time || window.APX.msg('justNow')}</em></div>
        <div class="je-t">${it.t[lang]}</div>
        <div class="je-l"><span>Dr ${it.dr[lang]}</span><span>${it.amt}</span></div>
        <div class="je-l cr"><span>Cr ${it.cr[lang]}</span><span>${it.amt}</span></div>
        <div class="je-foot"><span class="tag ok">${window.APX.msg('posted')}</span><span class="tag info">QAR</span></div>
      </div>`).join('');
    tapeItems.forEach((it) => { it.fresh = false; });
  }
  function postEntry(key) {
    const d = TAPE[key];
    if (!d) return;
    jeNo += 1;
    tapeItems.unshift(Object.assign({ no: jeNo, fresh: true }, d, { time: null }));
    if (tapeItems.length > 4) tapeItems.pop();
    renderTape();
  }
  TAPE.seed.forEach((s) => { jeNo += 1; tapeItems.unshift(Object.assign({ no: jeNo }, s)); });

  const app = $('#app');
  const tabs = $$('.app-tabs [data-tab]');
  const urlEl = $('[data-url]');
  let current = 0;
  function showTab(i, fromUser) {
    current = (i + tabs.length) % tabs.length;
    tabs.forEach((t, k) => {
      const on = k === current;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const p = $('#' + t.getAttribute('aria-controls'));
      if (p) p.hidden = !on;
    });
    const key = tabs[current].dataset.tab;
    if (urlEl) urlEl.textContent = key;
    $$('.app-side [data-side]').forEach((s) => s.classList.toggle('on', s.dataset.side === key));
    postEntry(key);
    if (fromUser) tabs[current].focus({ preventScroll: true });
  }
  if (app && tabs.length) {
    renderTape();
    showTab(0);
    tabs.forEach((t, k) => t.addEventListener('click', () => showTab(k, true)));
    $('.app-tabs').addEventListener('keydown', (e) => {
      const dirRtl = document.documentElement.dir === 'rtl';
      if (e.key === 'ArrowRight') showTab(current + (dirRtl ? -1 : 1), true);
      if (e.key === 'ArrowLeft') showTab(current + (dirRtl ? 1 : -1), true);
    });
    if (!reduced) {
      // Advance when the active tab's progress bar finishes; hovering pauses it.
      app.addEventListener('animationend', (e) => { if (e.target.classList.contains('bar')) showTab(current + 1); });
      app.addEventListener('mouseenter', () => app.classList.add('paused'));
      app.addEventListener('mouseleave', () => app.classList.remove('paused'));
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([en]) => app.classList.toggle('paused', !en.isIntersecting), { threshold: 0.25 }).observe(app);
      }
      requestAnimationFrame(() => setTimeout(() => app.classList.add('flat'), 350));
    } else {
      app.classList.add('flat');
      $$('.app-tabs .bar').forEach((b) => b.remove());
    }
  }
  const units = $('#units');
  if (units) {
    const vacant = [7, 19, 33, 41, 58], ending = [12, 26, 47];
    units.innerHTML = Array.from({ length: 60 }, (_, i) => `<i class="${vacant.includes(i) ? 'v' : ending.includes(i) ? 'l' : ''}"></i>`).join('');
  }

  /* ------------------------------------------------------------------ */
  /* reveal, counters, versus                                            */
  /* ------------------------------------------------------------------ */
  const revealAll = () => $$('.rv').forEach((el) => el.classList.add('in'));
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.rv').forEach((el) => io.observe(el));
    window.addEventListener('beforeprint', revealAll);
  } else {
    revealAll();
  }

  function countUp(el) {
    const target = parseInt(el.dataset.count, 10);
    if (reduced || !target) { el.textContent = String(target); return; }
    const t0 = performance.now(), dur = 1200;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const counters = $$('[data-count]');
  const versus = $('#versus');
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        if (en.target === versus) versus.classList.add('in');
        else countUp(en.target);
        cio.unobserve(en.target);
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => cio.observe(c));
    if (versus) cio.observe(versus);
  } else if (versus) { versus.classList.add('in'); }

  /* spotlight on bento tiles */
  $$('.tile').forEach((t) => t.addEventListener('pointermove', (e) => {
    const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', `${e.clientX - r.left}px`);
    t.style.setProperty('--my', `${e.clientY - r.top}px`);
  }));

  /* ------------------------------------------------------------------ */
  /* pricing toggle                                                      */
  /* ------------------------------------------------------------------ */
  $$('[data-bill]').forEach((b) => b.addEventListener('click', () => {
    const yearly = b.dataset.bill === 'yearly';
    $$('[data-bill]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $$('.plans [data-m]').forEach((el) => { el.textContent = yearly ? el.dataset.y : el.dataset.m; });
  }));

  /* ------------------------------------------------------------------ */
  /* FAQ                                                                 */
  /* ------------------------------------------------------------------ */
  $$('.qa > button').forEach((btn) => btn.addEventListener('click', () => {
    const qa = btn.parentElement;
    const open = !qa.classList.contains('open');
    $$('.qa.open').forEach((o) => { if (o !== qa) { o.classList.remove('open'); o.querySelector('button').setAttribute('aria-expanded', 'false'); } });
    qa.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  }));

  /* ------------------------------------------------------------------ */
  /* Dalil demo chat (its own product, its own language toggle)          */
  /* ------------------------------------------------------------------ */
  const DL = {
    en: [
      { q: 'How many days of annual leave do new hires get?', a: 'New employees accrue <span class="lit">2.5 days per month</span> of annual leave, starting after the 3-month probation.', c: 'Employee Handbook · p.12' },
      { q: 'What’s the notice period in the Gulf Cables contract?', a: 'Either party may end the agreement with <span class="lit">60 days’ written notice</span>.', c: 'Supply Agreement — Gulf Cables · §14.2 · p.9' },
    ],
    ar: [
      { q: 'كم يوم إجازة سنوية يحصل عليه الموظف الجديد؟', a: 'يستحق الموظف الجديد <span class="lit">٢٫٥ يوم عن كل شهر</span> من الإجازة السنوية، بعد انتهاء فترة التجربة (٣ أشهر).', c: 'دليل الموظف · ص ١٢' },
      { q: 'ما مدة الإشعار في عقد Gulf Cables؟', a: 'يحق لأي من الطرفين إنهاء الاتفاقية بإشعار كتابي مدته <span class="lit">٦٠ يومًا</span>.', c: 'اتفاقية التوريد — Gulf Cables · البند ١٤٫٢ · ص ٩' },
    ],
  };
  const dlBox = $('#dlmsgs');
  let dlLang = 'en', dlRun = 0, dlVisible = false;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const citeIcon = '<svg viewBox="0 0 12 14" fill="currentColor"><path d="M2 0h6l4 4v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2Zm6 1v3h3"/></svg>';
  async function playDalil() {
    if (!dlBox) return;
    const run = ++dlRun;
    dlBox.dir = dlLang === 'ar' ? 'rtl' : 'ltr';
    dlBox.innerHTML = '';
    const script = DL[dlLang];
    if (reduced) {
      dlBox.innerHTML = script.map((s) => `<div class="bub q">${s.q}</div><div class="bub a">${s.a}<br><span class="cite">${citeIcon}${s.c}</span></div>`).join('');
      return;
    }
    for (const s of script) {
      if (run !== dlRun) return;
      dlBox.insertAdjacentHTML('beforeend', `<div class="bub q" style="animation:fadein .4s">${s.q}</div>`);
      await wait(500);
      if (run !== dlRun) return;
      dlBox.insertAdjacentHTML('beforeend', '<div class="bub a typing"><i></i><i></i><i></i></div>');
      await wait(1300);
      if (run !== dlRun) return;
      dlBox.lastElementChild.remove();
      dlBox.insertAdjacentHTML('beforeend', `<div class="bub a" style="animation:fadein .5s">${s.a}<br><span class="cite">${citeIcon}${s.c}</span></div>`);
      await wait(2600);
    }
    await wait(3500);
    if (run === dlRun && dlVisible) playDalil();
  }
  $$('[data-dl]').forEach((b) => b.addEventListener('click', () => {
    dlLang = b.dataset.dl;
    $$('[data-dl]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    playDalil();
  }));
  if (dlBox && 'IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => {
      const was = dlVisible;
      dlVisible = en.isIntersecting;
      if (dlVisible && !was) playDalil();
    }, { threshold: 0.3 }).observe(dlBox);
  } else if (dlBox) { dlVisible = true; playDalil(); }

  /* ------------------------------------------------------------------ */
  /* demo request modal                                                  */
  /* ------------------------------------------------------------------ */
  const modal = $('#demo');
  let lastFocus = null;
  function syncProduct() {
    if (!modal) return;
    const p = (modal.querySelector('input[name="product"]:checked') || {}).value;
    const erp = modal.querySelector('[data-erp-only]');
    if (erp) erp.hidden = p === 'dalil';
  }
  function openDemo(product) {
    if (!modal) return;
    lastFocus = document.activeElement;
    const form = $('#demoForm'), ok = $('#demoOk');
    if (form && ok && !ok.hidden) { form.hidden = false; ok.hidden = true; form.reset(); }
    if (product) {
      const r = modal.querySelector(`input[name="product"][value="${product}"]`);
      if (r) r.checked = true;
    }
    syncProduct();
    setMenu(false);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { const f = $('#dName'); if (f) f.focus(); }, 60);
  }
  function closeDemo() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (location.hash === '#demo') history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open-demo]');
    if (o) { e.preventDefault(); openDemo(o.dataset.product); return; }
    if (e.target.closest('[data-close]') || e.target === modal) closeDemo();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (modal && modal.classList.contains('open')) closeDemo();
    else if (mm && mm.classList.contains('open')) setMenu(false);
  });
  if (modal) {
    modal.addEventListener('change', (e) => { if (e.target.name === 'product') syncProduct(); });
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const f = $$('button, [href], input:not(.hp), select, textarea', modal).filter((x) => !x.disabled && x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
  }
  if (location.hash === '#demo') setTimeout(() => openDemo(), 300);

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  function fieldError(input, msg) {
    const f = input.closest('.field');
    if (!f) return;
    f.classList.toggle('err', !!msg);
    const m = f.querySelector('.msg');
    if (m) m.textContent = msg || '';
  }
  window.APX.fieldError = fieldError;

  /** POST JSON to the public API; resolves {ok,status,data}. */
  async function postJSON(path, body) {
    try {
      const res = await fetch(CONFIG.api + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      let data = null;
      try { data = await res.json(); } catch (e) { data = null; }
      return { ok: res.ok, status: res.status, data };
    } catch (e) {
      return { ok: false, status: 0, data: null };
    }
  }
  window.APX.postJSON = postJSON;

  const demoForm = $('#demoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const errBox = demoForm.querySelector('.form-err');
      errBox.classList.remove('show');
      const fd = new FormData(demoForm);
      let bad = false;
      ['name', 'company'].forEach((n) => {
        const el = demoForm.elements[n];
        const v = String(fd.get(n) || '').trim();
        fieldError(el, v ? '' : window.APX.msg('required'));
        if (!v) bad = true;
      });
      const em = demoForm.elements.email;
      const ev = String(fd.get('email') || '').trim();
      const emErr = !ev ? window.APX.msg('required') : !emailOk(ev) ? window.APX.msg('email') : '';
      fieldError(em, emErr);
      if (emErr) bad = true;
      if (bad) { const first = demoForm.querySelector('.field.err .input'); if (first) first.focus(); return; }

      const btn = demoForm.querySelector('button[type="submit"]');
      const label = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner"></span><span>${window.APX.msg('sending')}</span>`;
      const product = fd.get('product') || 'erp';
      const payload = {
        product,
        name: String(fd.get('name')).trim(),
        email: ev,
        company: String(fd.get('company')).trim(),
        phone: String(fd.get('phone') || '').trim() || undefined,
        company_size: fd.get('company_size') || undefined,
        preferred_date: fd.get('preferred_date') || undefined,
        interests: product === 'erp' ? fd.getAll('interests') : [],
        message: String(fd.get('message') || '').trim() || undefined,
        language: lang,
        website: fd.get('website') || '',
      };
      const r = await postJSON('/public/demo-requests', payload);
      btn.disabled = false;
      btn.innerHTML = label;
      if (r.ok) {
        demoForm.hidden = true;
        $('#demoOk').hidden = false;
        return;
      }
      if (r.status === 422 && r.data && r.data.errors) {
        Object.entries(r.data.errors).forEach(([k, v]) => {
          const el = demoForm.elements[k];
          if (el && el.classList) fieldError(el, Array.isArray(v) ? v[0] : String(v));
        });
        return;
      }
      errBox.textContent = r.status === 429 ? window.APX.msg('rate') : r.status === 0 ? window.APX.msg('network') : window.APX.msg('server');
      errBox.classList.add('show');
    });
  }

  /* ------------------------------------------------------------------ */
  /* inline "claim your workspace"                                       */
  /* ------------------------------------------------------------------ */
  const claim = $('#claim');
  if (claim) {
    const inp = $('#claimSlug');
    inp.addEventListener('input', () => {
      const clean = inp.value.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-+/, '').slice(0, 30);
      if (clean !== inp.value) inp.value = clean;
    });
    claim.addEventListener('submit', (e) => {
      e.preventDefault();
      const s = inp.value.replace(/-+$/, '');
      location.href = 'start.html' + (s ? `?slug=${encodeURIComponent(s)}` : '');
    });
  }

  /* re-render JS-built strings when language changes */
  window.APX.onLang(() => { renderTape(); });

  /* initial language: saved choice, else English */
  let saved = 'en';
  try { saved = localStorage.getItem('apx_lang') || 'en'; } catch (e) { /* ignore */ }
  if (saved === 'ar') applyLang('ar');
  else $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === 'en')));
  if (saved === 'ar' && dlBox) { dlLang = 'ar'; $$('[data-dl]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.dl === 'ar'))); }
})();
