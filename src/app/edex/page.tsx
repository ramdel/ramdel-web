import EdexClock from '@/components/edex/EdexClock';
import EdexTypewriter from '@/components/edex/EdexTypewriter';
import EdexGauge from '@/components/edex/EdexGauge';
import EdexMatrixCanvas from '@/components/edex/EdexMatrixColumn';

// ────────────────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────────────────

const BOOT_LINES = [
  'SYSTEM BOOT — RAMDEL.DEV v2.0',
  'Loading security modules...',
  'Connecting to AWS infrastructure...',
  'Initializing DevSecOps protocols...',
  'Threat intelligence: ONLINE',
  'Welcome, MARIO DE JESUS',
];

const MODULES = [
  { name: 'AWS Cloud', cat: 'INFRA' },
  { name: 'Terraform', cat: 'IaC' },
  { name: 'Docker', cat: 'CONTAINER' },
  { name: 'GitHub Actions', cat: 'CI/CD' },
  { name: 'Python / Boto3', cat: 'SCRIPTING' },
  { name: 'PHP / Laravel', cat: 'BACKEND' },
  { name: 'Vulnerability Mgmt', cat: 'SEC' },
  { name: 'SAST / DAST', cat: 'SEC' },
  { name: 'IAM / KMS / WAF', cat: 'AWS SEC' },
  { name: 'PostgreSQL', cat: 'DATA' },
  { name: 'React / Next.js', cat: 'FRONTEND' },
  { name: 'Linux / Bash', cat: 'OS' },
];

const SKILLS = [
  { label: 'DevSecOps', pct: 95, color: 'cyan' as const },
  { label: 'Cloud Architecture', pct: 90, color: 'cyan' as const },
  { label: 'Security Automation', pct: 92, color: 'green' as const },
  { label: 'AI Integration', pct: 85, color: 'green' as const },
  { label: 'Technical Leadership', pct: 88, color: 'cyan' as const },
  { label: 'Infrastructure as Code', pct: 87, color: 'cyan' as const },
];

const OPERATIONS = [
  {
    id: 'OPS-001',
    title: 'Zero-Trust Security Overhaul',
    desc: 'Remediated 111+ critical vulnerabilities. Compliance raised from 45% → 92%.',
    status: 'COMPLETE',
    tags: ['AWS', 'Python', 'IAM', 'WAF'],
  },
  {
    id: 'OPS-002',
    title: 'AWS Cost Optimization Campaign',
    desc: 'Reduced cloud spend by 46% via rightsizing, reserved instances and automation.',
    status: 'COMPLETE',
    tags: ['Cost Explorer', 'Terraform', 'Lambda'],
  },
  {
    id: 'OPS-003',
    title: 'AI-Powered Remediation Pipeline',
    desc: 'Automated threat detection & remediation, reducing response time by 70%.',
    status: 'ACTIVE',
    tags: ['Python', 'ML', 'GitHub Actions', 'SIEM'],
  },
  {
    id: 'OPS-004',
    title: 'Legacy Platform Modernization',
    desc: 'Migrated monolithic PHP app to containerized microservices on AWS ECS.',
    status: 'ACTIVE',
    tags: ['Docker', 'ECS', 'RDS', 'Laravel'],
  },
];

// ────────────────────────────────────────────────────────────────────
// Sub-components (server-safe, no state)
// ────────────────────────────────────────────────────────────────────

function PanelHeader({ title }: { title: string }) {
  return (
    <div className="edex-panel-header">
      <span className="edex-panel-dot" />
      <span className="edex-panel-title">{title}</span>
    </div>
  );
}

function OperationCard({
  id, title, desc, status, tags,
}: (typeof OPERATIONS)[0]) {
  const isActive = status === 'ACTIVE';
  return (
    <div className="edex-panel edex-panel-corners p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="edex-label">{id}</div>
          <div
            className="text-sm font-bold mt-1 tracking-wide"
            style={{ color: 'var(--edex-white)' }}
          >
            {title}
          </div>
        </div>
        <div
          className="text-xs px-2 py-0.5 border shrink-0"
          style={{
            borderColor: isActive ? 'var(--edex-green)' : 'rgba(0,229,255,0.3)',
            color: isActive ? 'var(--edex-green)' : 'var(--edex-gray)',
          }}
        >
          {status}
        </div>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--edex-gray)' }}>
        {desc}
      </p>
      <div className="flex flex-wrap gap-1 pt-1">
        {tags.map(t => (
          <span
            key={t}
            className="text-xs px-1.5 py-0.5"
            style={{
              background: 'rgba(0,229,255,0.06)',
              border: '1px solid rgba(0,229,255,0.15)',
              color: 'var(--edex-cyan-dim)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────

export default function EdexPage() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* ── TOP BAR ──────────────────────────────────────────────── */}
      <header className="edex-topbar">
        <div className="flex items-stretch h-10">
          <div className="edex-topbar-segment">
            <span
              className="text-xs font-bold tracking-widest"
              style={{ color: 'var(--edex-cyan)', textShadow: 'var(--edex-glow-sm)' }}
            >
              RAMDEL.DEV
            </span>
          </div>
          <div className="edex-topbar-segment">
            <span className="edex-label">SYSTEM</span>
            <span className="text-xs edex-cyan-glow">SECURITY DASHBOARD v2.0</span>
          </div>
          <div className="edex-topbar-segment hidden md:flex">
            <span className="edex-label">NODE</span>
            <span className="text-xs edex-green-glow">MTL-QC-CA-01</span>
          </div>
          <div className="edex-topbar-segment hidden md:flex">
            <span className="edex-label">STATUS</span>
            <span className="text-xs edex-green-glow animate-pulse">● ONLINE</span>
          </div>
          <div className="edex-topbar-segment hidden lg:flex">
            <span className="edex-label">THREAT</span>
            <span className="text-xs" style={{ color: 'var(--edex-green)' }}>NEAR-ZERO</span>
          </div>
          {/* Spacer */}
          <div className="flex-1" />
          <div className="edex-topbar-segment">
            <EdexClock />
          </div>
        </div>
      </header>

      {/* ── MAIN GRID ─────────────────────────────────────────────── */}
      <div className="edex-main-grid flex-1">

        {/* ── LEFT PANEL: Identity ──────────────────────────────── */}
        <div
          className="edex-panel flex flex-col"
          style={{ background: 'var(--edex-panel)' }}
        >
          <PanelHeader title="OPERATOR IDENTITY" />

          {/* Matrix rain decoration */}
          <div className="flex justify-center overflow-hidden" style={{ maxHeight: 120, opacity: 0.6 }}>
            <EdexMatrixCanvas width={260} height={120} />
          </div>

          <div className="p-4 space-y-5 flex-1">
            {/* Name */}
            <div>
              <div className="edex-label mb-1">DESIGNATION</div>
              <div
                className="text-2xl font-bold leading-tight tracking-wider edex-flicker"
                style={{ color: 'var(--edex-cyan)', textShadow: 'var(--edex-glow-md)' }}
              >
                MARIO<br />DE JESUS
              </div>
            </div>

            {/* Role */}
            <div>
              <div className="edex-label mb-1">ROLE</div>
              <div className="text-xs font-bold tracking-widest" style={{ color: 'var(--edex-green)', textShadow: '0 0 8px rgba(0,255,136,0.6)' }}>
                DEVSECOPS ENGINEER
              </div>
              <div className="text-xs tracking-wide mt-0.5" style={{ color: 'var(--edex-gray)' }}>
                Security-First Technical Lead
              </div>
              <div className="text-xs tracking-wide" style={{ color: 'var(--edex-gray)' }}>
                Cloud Architect
              </div>
            </div>

            {/* Location */}
            <div>
              <div className="edex-label mb-1">COORDINATES</div>
              <div className="text-xs" style={{ color: 'var(--edex-cyan)' }}>
                45.5017° N, 73.5673° W
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--edex-gray)' }}>
                MONTREAL, CANADA
              </div>
            </div>

            {/* Clearance */}
            <div>
              <div className="edex-label mb-2">SYSTEM ACCESS</div>
              <div className="space-y-1">
                {[
                  { label: 'AWS ROOT', color: 'var(--edex-green)' },
                  { label: 'TERRAFORM CLOUD', color: 'var(--edex-green)' },
                  { label: 'GITHUB ENTERPRISE', color: 'var(--edex-green)' },
                  { label: 'SECURITY CENTER', color: 'var(--edex-cyan)' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span
                      className="text-xs"
                      style={{ color: item.color, textShadow: `0 0 4px ${item.color}` }}
                    >
                      ▶
                    </span>
                    <span className="text-xs tracking-wider" style={{ color: 'var(--edex-white)' }}>
                      {item.label}
                    </span>
                    <span className="text-xs ml-auto" style={{ color: item.color }}>
                      GRANTED
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Boot terminal */}
            <div>
              <div className="edex-label mb-2">BOOT LOG</div>
              <div
                className="p-3 text-xs"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(0,229,255,0.1)',
                }}
              >
                <EdexTypewriter lines={BOOT_LINES} speed={35} />
              </div>
            </div>
          </div>
        </div>

        {/* ── CENTER PANEL: Hero + Metrics ─────────────────────── */}
        <div
          className="edex-panel flex flex-col"
          style={{ background: 'var(--edex-bg2)' }}
        >
          <PanelHeader title="SYSTEM OVERVIEW" />

          <div className="flex-1 flex flex-col p-6 gap-6 overflow-auto">

            {/* Hero */}
            <div className="text-center space-y-3 pt-4">
              <div className="edex-label tracking-widest">SECURITY OPERATIONS CENTER</div>
              <div className="edex-title-hero edex-flicker">
                MARIO DE JESUS
              </div>
              <div className="edex-subtitle">
                DEVSECOPS ENGINEER · CLOUD ARCHITECT · SECURITY LEAD
              </div>
              <p
                className="text-sm max-w-xl mx-auto leading-relaxed"
                style={{ color: 'var(--edex-gray)' }}
              >
                AI-powered security automation specialist. Building resilient, compliant
                cloud infrastructure with measurable business impact.
              </p>
            </div>

            <div className="edex-divider" />

            {/* System Metrics */}
            <div>
              <div className="edex-section-title mb-4">SYSTEM METRICS</div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="edex-metric">
                  <div className="edex-metric-value edex-cyan-glow">111+</div>
                  <div className="edex-metric-label">VULN PATCHED</div>
                </div>
                <div className="edex-metric">
                  <div className="edex-metric-value edex-green-glow">92%</div>
                  <div className="edex-metric-label">COMPLIANCE</div>
                </div>
                <div className="edex-metric">
                  <div className="edex-metric-value edex-cyan-glow">46%</div>
                  <div className="edex-metric-label">COST REDUCTION</div>
                </div>
                <div className="edex-metric">
                  <div className="edex-metric-value edex-green-glow">70%</div>
                  <div className="edex-metric-label">FASTER REMEDIATION</div>
                </div>
              </div>
            </div>

            {/* System Load Gauges */}
            <div>
              <div className="edex-section-title mb-4">CAPABILITY INDEX</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SKILLS.map(s => (
                  <EdexGauge
                    key={s.label}
                    label={s.label}
                    value={s.pct}
                    color={s.color}
                  />
                ))}
              </div>
            </div>

            <div className="edex-divider" />

            {/* About */}
            <div>
              <div className="edex-section-title mb-3">OPERATOR PROFILE</div>
              <div
                className="text-sm leading-relaxed space-y-2"
                style={{ color: 'var(--edex-white)', opacity: 0.85 }}
              >
                <p>
                  Security-first technical lead with extensive experience securing cloud
                  infrastructure across AWS environments. Proven track record of transforming
                  vulnerable systems into hardened, compliant platforms.
                </p>
                <p>
                  Specializes in building AI-powered automation pipelines that detect and
                  remediate threats at scale — reducing response times by 70% while
                  cutting operational overhead.
                </p>
                <p>
                  Passionate about bridging the gap between development velocity and
                  security rigor — enabling teams to ship faster without compromising
                  on compliance or resilience.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ── RIGHT PANEL: Modules ──────────────────────────────── */}
        <div
          className="edex-panel flex flex-col"
          style={{ background: 'var(--edex-panel)' }}
        >
          <PanelHeader title="MODULES LOADED" />

          <div className="p-4 flex flex-col gap-2 flex-1 overflow-auto">
            {MODULES.map(m => (
              <div key={m.name} className="edex-module">
                <span className="edex-module-status" />
                <div className="flex-1 min-w-0">
                  <div className="truncate" style={{ fontSize: '0.7rem' }}>{m.name}</div>
                  <div style={{ fontSize: '0.55rem', color: 'var(--edex-gray)' }}>{m.cat}</div>
                </div>
                <span
                  className="text-xs"
                  style={{ color: 'var(--edex-green)', fontSize: '0.6rem' }}
                >
                  OK
                </span>
              </div>
            ))}

            <div className="edex-divider" />

            {/* Uptime */}
            <div className="space-y-2">
              <div className="edex-label">UPTIME RECORD</div>
              <div className="text-2xl font-bold edex-green-glow">99.9%</div>
              <div className="edex-label">INFRA MAINTAINED</div>
            </div>

            <div className="space-y-1 mt-2">
              <div className="edex-label mb-2">ACTIVE PROTOCOLS</div>
              {[
                'ZERO-TRUST ARCHITECTURE',
                'SHIFT-LEFT SECURITY',
                'AI THREAT DETECTION',
                'AUTO-REMEDIATION',
                'CONTINUOUS COMPLIANCE',
              ].map(p => (
                <div key={p} className="flex items-center gap-2">
                  <span className="text-xs edex-green-glow">◆</span>
                  <span className="text-xs tracking-wider" style={{ color: 'var(--edex-white)', opacity: 0.8 }}>
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM PANELS ─────────────────────────────────────────── */}
      <div className="edex-bottom-panels" style={{ borderTop: '1px solid var(--edex-border)' }}>

        {/* Operations Log */}
        <div className="edex-panel" style={{ background: 'var(--edex-panel)' }}>
          <PanelHeader title="OPERATIONS LOG // PROJECTS" />
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OPERATIONS.map(op => (
              <OperationCard key={op.id} {...op} />
            ))}
          </div>
        </div>

        {/* Contact / Links */}
        <div className="edex-panel" style={{ background: 'var(--edex-bg2)' }}>
          <PanelHeader title="COMMUNICATION CHANNELS" />
          <div className="p-6 space-y-6">

            <div className="space-y-3">
              {[
                { label: 'PRIMARY', proto: 'EMAIL', value: 'hello@ramdel.dev', color: 'var(--edex-cyan)' },
                { label: 'NETWORK', proto: 'GITHUB', value: 'github.com/ramdel', color: 'var(--edex-green)' },
                { label: 'NETWORK', proto: 'LINKEDIN', value: 'linkedin.com/in/ramdel', color: 'var(--edex-cyan)' },
                { label: 'DOMAIN', proto: 'WEB', value: 'ramdel.dev', color: 'var(--edex-green)' },
              ].map(ch => (
                <div key={ch.proto} className="flex items-center gap-3">
                  <div className="text-xs tracking-widest w-16" style={{ color: 'var(--edex-gray)' }}>
                    {ch.label}
                  </div>
                  <div
                    className="text-xs px-2 py-0.5"
                    style={{
                      border: `1px solid ${ch.color}`,
                      color: ch.color,
                      textShadow: `0 0 6px ${ch.color}`,
                      width: 90,
                      textAlign: 'center',
                    }}
                  >
                    {ch.proto}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--edex-white)', opacity: 0.8 }}>
                    {ch.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="edex-divider" />

            <div>
              <div className="edex-section-title mb-3">CERTIFICATIONS & CLEARANCE</div>
              <div className="space-y-2">
                {[
                  'AWS Security Specialty — IN PROGRESS',
                  'DevSecOps Professional — ACTIVE',
                  'Cloud Architecture — ACTIVE',
                  'Penetration Testing — ACTIVE',
                ].map(cert => (
                  <div key={cert} className="flex items-center gap-2">
                    <span className="edex-cyan-glow text-xs">▸</span>
                    <span className="text-xs" style={{ color: 'var(--edex-white)', opacity: 0.8 }}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── STATUS BAR ────────────────────────────────────────────── */}
      <footer className="edex-statusbar">
        <div className="flex items-center h-7 overflow-x-auto">
          <div className="edex-statusbar-item edex-cyan-glow">RAMDEL.DEV</div>
          <div className="edex-statusbar-item" style={{ color: 'var(--edex-gray)' }}>
            45.5017°N 73.5673°W
          </div>
          <div className="edex-statusbar-item edex-green-glow">● SYSTEM NOMINAL</div>
          <div className="edex-statusbar-item hidden md:block" style={{ color: 'var(--edex-gray)' }}>
            THREAT: NEAR-ZERO
          </div>
          <div className="edex-statusbar-item hidden lg:block" style={{ color: 'var(--edex-gray)' }}>
            COMPLIANCE: 92%
          </div>
          <div className="edex-statusbar-item hidden lg:block" style={{ color: 'var(--edex-gray)' }}>
            VULNERABILITIES: 0 CRITICAL
          </div>
          <div className="flex-1" />
          <div className="edex-statusbar-item" style={{ color: 'var(--edex-gray)' }}>
            DESIGN PROPOSAL — eDEX-UI THEME
          </div>
          <div className="edex-statusbar-item edex-cyan-glow">v2.0.0</div>
        </div>
      </footer>
    </div>
  );
}
