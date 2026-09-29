import React, { useState, useMemo } from "react";
import { 
  Search, ExternalLink, BarChart3, Table2, LayoutDashboard, 
  Folder, Users, PhoneCall, CreditCard, TrendingUp, Zap, 
  Briefcase, PieChart, SlidersHorizontal, CircleDollarSign, 
  Archive
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// DATA STORE
// ═══════════════════════════════════════════════════════════════════════
const PORTAL_LINKS = [
  // ── INTERNAL WEB APPS ──
  {
    id: 1, category: "Web Apps", icon: LayoutDashboard,
    title: "Marketing Intelligence Dashboard",
    description: "Live React dashboard for payout pacing, campaign stats, and tier evaluations.",
    url: "https://pacific-debt.marketing-intel.workers.dev/"
  },
  {
    id: 2, category: "Web Apps", icon: Zap,
    title: "Sales Scorecard",
    description: "Live real-time performance and productivity tracking for the sales floor.",
    url: "https://pdr-sales-scoreboard.marketing-intel.workers.dev/"
  },

  // ── POWER BI: MAIN REPORTS ──
  {
    id: 3, category: "Power BI (Main)", icon: Folder,
    title: "Shravan's Reports (Folder)",
    description: "Master Power BI workspace folder containing all core analytical reports.",
    url: "https://app.powerbi.com/groups/d9794f77-cb2c-4dca-b270-ddd55adc11d4/list?experience=power-bi&clientSideAuth=0&subfolderId=81233"
  },
  {
    id: 4, category: "Power BI (Main)", icon: BarChart3,
    title: "New Master Report",
    description: "The primary top-level executive dashboard for overall business performance.",
    url: "https://app.powerbi.com/links/xWHpu0cMYX?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkSharec"
  },
  {
    id: 5, category: "Power BI (Main)", icon: Users,
    title: "New All Leads Report",
    description: "Comprehensive view of all incoming leads, filtering, and funnel progress.",
    url: "https://app.powerbi.com/links/rk--2nwKqe?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare"
  },
  {
    id: 6, category: "Power BI (Main)", icon: Briefcase,
    title: "Sales Manager Dashboard",
    description: "High-level overviews and drill-downs for sales management and floor oversight.",
    url: "https://app.powerbi.com/links/5cfAVkgE5s?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare"
  },
  {
    id: 7, category: "Power BI (Main)", icon: PhoneCall,
    title: "Contact Rate Monitoring",
    description: "Tracks speed-to-lead and overall contact penetration metrics across sources.",
    url: "https://app.powerbi.com/links/vKs7H9_SVZ?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare"
  },
  {
    id: 8, category: "Power BI (Main)", icon: CreditCard,
    title: "Credit Pull Report",
    description: "Analysis of credit pull execution, debt amounts, and qualification rates.",
    url: "https://app.powerbi.com/links/ViYGNm-r_c?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare"
  },
  {
    id: 9, category: "Power BI (Main)", icon: TrendingUp,
    title: "Deal Dynamics & Productivity",
    description: "Deep dive into deal velocity, rep productivity, and conversion triggers.",
    url: "https://app.powerbi.com/links/m3tnb3iJA-?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare"
  },

  // ── POWER BI: VENDORS ──
  {
    id: 10, category: "Power BI (Vendors)", icon: Folder,
    title: "Vendor Reports (New)",
    description: "Workspace folder containing all updated, active vendor-specific reports.",
    url: "https://app.powerbi.com/groups/d9794f77-cb2c-4dca-b270-ddd55adc11d4/list?experience=power-bi&clientSideAuth=0&subfolderId=32017"
  },
  {
    id: 11, category: "Power BI (Vendors)", icon: Archive,
    title: "Vendor Reports (Legacy)",
    description: "Archived folder containing historical or deprecated vendor reports.",
    url: "https://app.powerbi.com/groups/d9794f77-cb2c-4dca-b270-ddd55adc11d4/list?experience=power-bi&clientSideAuth=0&subfolderId=3484"
  },
  {
    id: 12, category: "Power BI (Vendors)", icon: PieChart,
    title: "Bearing Fruit Report",
    description: "Performance metrics and conversion tracking specific to Bearing Fruit campaigns.",
    url: "https://app.powerbi.com/links/hRatszIeeq?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare"
  },
  {
    id: 13, category: "Power BI (Vendors)", icon: PieChart,
    title: "Forbes Report",
    description: "Performance metrics and capping analysis for Forbes lead flow.",
    url: "https://app.powerbi.com/links/h8tassPzq2?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare"
  },
  {
    id: 14, category: "Power BI (Vendors)", icon: PieChart,
    title: "LGX Report",
    description: "Performance and attribution tracking for the LGX campaign.",
    url: "https://app.powerbi.com/links/aOFkFVEaiO?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare"
  },

  // ── GOOGLE SHEETS: CONFIGURATION ──
  {
    id: 15, category: "Sheets (Config)", icon: SlidersHorizontal,
    title: "Sales Rep Tiers (Moving Day / PTO)",
    description: "Configuration sheet for rep tier assignments, moving days, and commission PTO.",
    url: "https://docs.google.com/spreadsheets/d/11qSNkJLkMZMvB5mz1AUVlYZiw78j6hZhu4hwI_nlJ9M/edit?pli=1&gid=0#gid=0"
  },
  {
    id: 16, category: "Sheets (Config)", icon: Users,
    title: "Sales Reps & Tiers (Reporting)",
    description: "Master roster mapping sales reps to their current performance tiers.",
    url: "https://docs.google.com/spreadsheets/d/1jl64MnBjy1P_stXHaCE_3FpZOngYIHaEZcrY1nBdAqg/edit?pli=1&gid=0#gid=0"
  },
  {
    id: 17, category: "Sheets (Config)", icon: CircleDollarSign,
    title: "Marketing Cost Structure Tracker",
    description: "Central pricing matrix defining CPA, CPL, and CPM payout rules per partner.",
    url: "https://docs.google.com/spreadsheets/d/1s-dbQVmVpcACaqCzaUKtDfM0Ev0utzH5ebbz3qi-uBQ/edit?pli=1&gid=0#gid=0"
  },

  // ── GOOGLE SHEETS: EXPORTS ──
  {
    id: 18, category: "Sheets (Data Exports)", icon: Table2,
    title: "Main Lead Export (Master)",
    description: "Automated daily CSV feed containing all raw leads across all campaigns.",
    url: "https://docs.google.com/spreadsheets/d/1wWmKrRkGS9fTSYYBpZjODeVo4TBh-Gfrhf2p2Zg9QPU/edit?gid=0#gid=0"
  },
  {
    id: 19, category: "Sheets (Data Exports)", icon: Table2,
    title: "BorrowBetter Export",
    description: "Automated daily CSV extract isolated for BorrowBetter.",
    url: "https://docs.google.com/spreadsheets/d/16sleNpG_CCVlwSPianDtl83IJTD2d6xQYXRX010MDgw/edit?gid=0#gid=0"
  },
  {
    id: 20, category: "Sheets (Data Exports)", icon: Table2,
    title: "Scale Up Media Export",
    description: "Automated daily CSV extract isolated for Scale Up Media campaigns.",
    url: "https://docs.google.com/spreadsheets/d/1RoE78ouXLmNUmfoKEhGafrYwivv53qZQCXOA1sBKAaU/edit?gid=0#gid=0"
  },
  {
    id: 21, category: "Sheets (Data Exports)", icon: Table2,
    title: "SMI Media Export",
    description: "Automated daily CSV extract isolated for SMI Media.",
    url: "https://docs.google.com/spreadsheets/d/19bXpsndQ4SABd1OZpO5lRnSYO3fIcAcSZNx1IGDYusQ/edit?gid=0#gid=0"
  },
  {
    id: 22, category: "Sheets (Data Exports)", icon: Table2,
    title: "Bearing Fruit Export",
    description: "Automated daily CSV extract isolated for all Bearing Fruit campaigns.",
    url: "https://docs.google.com/spreadsheets/d/1KocCHX1RCdG6qI_ePKIuzmSRjEy2juWpCsla5rVA3wI/edit?gid=0#gid=0"
  }
];

// ═══════════════════════════════════════════════════════════════════════
// UI COMPONENT
// ═══════════════════════════════════════════════════════════════════════
export default function Portal() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(PORTAL_LINKS.map((item) => item.category)))];

  const filteredLinks = useMemo(() => {
    return PORTAL_LINKS.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                            item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#F4F7F8", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0B1E26", margin: "0 0 10px 0" }}>Operations Hub</h1>
          <p style={{ fontSize: 16, color: "#5E7178", margin: 0 }}>Central directory for all Pacific Debt dashboards, reports, and living documents.</p>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: 16, marginBottom: 30, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 300px", maxWidth: 500 }}>
            <Search size={18} color="#90A1A7" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input 
              type="text" 
              placeholder="Search tools, reports, or keywords..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", boxSizing: "border-box", padding: "12px 16px 12px 40px", borderRadius: 12, border: "1px solid #D9E1E3", fontSize: 15, outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  padding: "8px 16px", borderRadius: 20, border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
                  background: selectedCategory === cat ? "#0E8A92" : "#E8EDEE",
                  color: selectedCategory === cat ? "#FFF" : "#5E7178"
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {filteredLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a 
                key={item.id} 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  display: "flex", flexDirection: "column", background: "#FFF", padding: 24, borderRadius: 16, border: "1px solid #D9E1E3", 
                  textDecoration: "none", color: "inherit", transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(11,30,38,0.03)" 
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(11,30,38,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(11,30,38,0.03)"; }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#E1F1F2", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A6A70" }}>
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#5E7178", background: "#F4F7F8", padding: "4px 10px", borderRadius: 6 }}>
                    {item.category}
                  </span>
                </div>
                
                <h3 style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: 700, color: "#0C2027", display: "flex", alignItems: "center", gap: 8 }}>
                  {item.title} <ExternalLink size={14} color="#90A1A7" />
                </h3>
                <p style={{ margin: 0, fontSize: 14, color: "#5E7178", lineHeight: 1.5, flex: 1 }}>
                  {item.description}
                </p>
              </a>
            )
          })}
          
          {filteredLinks.length === 0 && (
            <div style={{ gridColumn: "1 / -1", padding: 60, textAlign: "center", color: "#90A1A7", background: "#FFF", borderRadius: 16, border: "1px dashed #D9E1E3" }}>
              No links found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}