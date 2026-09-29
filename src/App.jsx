import React, { useState, useMemo } from "react";
import { 
  Search, ExternalLink, BarChart3, Table2, LayoutDashboard, 
  Folder, Users, PhoneCall, CreditCard, TrendingUp, Zap, 
  Briefcase, PieChart, SlidersHorizontal, CircleDollarSign, 
  Archive, ChevronDown, ChevronRight
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// NESTED DATA STORE
// ═══════════════════════════════════════════════════════════════════════
const PORTAL_DATA = [
  {
    id: "pbi-root",
    title: "Shravan Krishnan PBI Reports",
    description: "Master folder containing all core analytical reports.",
    url: "https://app.powerbi.com/groups/d9794f77-cb2c-4dca-b270-ddd55adc11d4/list?experience=power-bi&clientSideAuth=0&subfolderId=81233",
    icon: BarChart3,
    children: [
      {
        id: "pbi-1",
        title: "New Master Report",
        description: "Lead and row-level data about each and every lead in our system.",
        url: "https://app.powerbi.com/links/xWHpu0cMYX?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkSharec",
        icon: TrendingUp
      },
      {
        id: "pbi-2",
        title: "New All Leads Report",
        description: "Comprehensive view of all incoming leads, filtering, and funnel progress.",
        url: "https://app.powerbi.com/links/rk--2nwKqe?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare",
        icon: Users
      },
      {
        id: "pbi-3",
        title: "Sales Manager Dashboard",
        description: "High-level overviews and drill-downs for sales management and floor oversight.",
        url: "https://app.powerbi.com/links/5cfAVkgE5s?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare",
        icon: Briefcase
      },
      {
        id: "pbi-4",
        title: "Contact Rate Monitoring",
        description: "Tracks speed-to-lead and overall contact penetration metrics across sources.",
        url: "https://app.powerbi.com/links/vKs7H9_SVZ?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare",
        icon: PhoneCall
      },
      {
        id: "pbi-5",
        title: "Credit Pull Report",
        description: "Analysis of credit pull execution, debt amounts, and qualification rates.",
        url: "https://app.powerbi.com/links/ViYGNm-r_c?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare",
        icon: CreditCard
      },
      {
        id: "pbi-6",
        title: "Deal Dynamics & Productivity",
        description: "Focuses on metrics of reps and deal dynamics app usage.",
        url: "https://app.powerbi.com/links/m3tnb3iJA-?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare",
        icon: Zap
      },
      {
        id: "pbi-vendor-root",
        title: "Vendor Reports",
        description: "Workspace folder containing all updated, active vendor-specific reports.",
        url: "https://app.powerbi.com/groups/d9794f77-cb2c-4dca-b270-ddd55adc11d4/list?experience=power-bi&clientSideAuth=0&subfolderId=32017",
        icon: Folder,
        children: [
          {
            id: "ven-1",
            title: "Bearing Fruit Report",
            url: "https://app.powerbi.com/links/hRatszIeeq?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare",
            icon: PieChart
          },
          {
            id: "ven-2",
            title: "Forbes Report",
            url: "https://app.powerbi.com/links/h8tassPzq2?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare",
            icon: PieChart
          },
          {
            id: "ven-3",
            title: "LGX Report",
            url: "https://app.powerbi.com/links/aOFkFVEaiO?ctid=a294b6dc-00a7-4ac0-9505-9cf80c23a81f&pbi_source=linkShare",
            icon: PieChart
          },
          {
            id: "ven-legacy",
            title: "Vendor Reports (Legacy)",
            description: "Archived folder containing historical or deprecated vendor reports.",
            url: "https://app.powerbi.com/groups/d9794f77-cb2c-4dca-b270-ddd55adc11d4/list?experience=power-bi&clientSideAuth=0&subfolderId=3484",
            icon: Archive
          }
        ]
      }
    ]
  },
  {
    id: "web-apps",
    title: "Web Apps & Dashboards",
    description: "Custom React applications and live scoreboards.",
    icon: LayoutDashboard,
    children: [
      {
        id: "web-1",
        title: "Marketing Intelligence Dashboard",
        url: "https://pacific-debt.marketing-intel.workers.dev/",
        icon: LayoutDashboard
      },
      {
        id: "web-2",
        title: "Sales Scorecard",
        url: "https://pdr-sales-scoreboard.marketing-intel.workers.dev/",
        icon: Zap
      }
    ]
  },
  {
    id: "sheets",
    title: "Google Sheets (Config & Data)",
    description: "All automated CSV feeds and rep tier configurations.",
    icon: Table2,
    children: [
      {
        id: "sh-1",
        title: "Sales Rep Tiers (Moving Day / PTO)",
        url: "https://docs.google.com/spreadsheets/d/11qSNkJLkMZMvB5mz1AUVlYZiw78j6hZhu4hwI_nlJ9M/edit?pli=1&gid=0#gid=0",
        icon: SlidersHorizontal
      },
      {
        id: "sh-2",
        title: "Sales Reps & Tiers (Reporting)",
        url: "https://docs.google.com/spreadsheets/d/1jl64MnBjy1P_stXHaCE_3FpZOngYIHaEZcrY1nBdAqg/edit?pli=1&gid=0#gid=0",
        icon: Users
      },
      {
        id: "sh-3",
        title: "Marketing Cost Structure Tracker",
        url: "https://docs.google.com/spreadsheets/d/1s-dbQVmVpcACaqCzaUKtDfM0Ev0utzH5ebbz3qi-uBQ/edit?pli=1&gid=0#gid=0",
        icon: CircleDollarSign
      },
      {
        id: "sh-4",
        title: "Main Lead Export (Master)",
        url: "https://docs.google.com/spreadsheets/d/1wWmKrRkGS9fTSYYBpZjODeVo4TBh-Gfrhf2p2Zg9QPU/edit?gid=0#gid=0",
        icon: Table2
      },
      {
        id: "sh-5",
        title: "BorrowBetter Export",
        url: "https://docs.google.com/spreadsheets/d/16sleNpG_CCVlwSPianDtl83IJTD2d6xQYXRX010MDgw/edit?gid=0#gid=0",
        icon: Table2
      },
      {
        id: "sh-6",
        title: "Scale Up Media Export",
        url: "https://docs.google.com/spreadsheets/d/1RoE78ouXLmNUmfoKEhGafrYwivv53qZQCXOA1sBKAaU/edit?gid=0#gid=0",
        icon: Table2
      },
      {
        id: "sh-7",
        title: "SMI Media Export",
        url: "https://docs.google.com/spreadsheets/d/19bXpsndQ4SABd1OZpO5lRnSYO3fIcAcSZNx1IGDYusQ/edit?gid=0#gid=0",
        icon: Table2
      },
      {
        id: "sh-8",
        title: "Bearing Fruit Export",
        url: "https://docs.google.com/spreadsheets/d/1KocCHX1RCdG6qI_ePKIuzmSRjEy2juWpCsla5rVA3wI/edit?gid=0#gid=0",
        icon: Table2
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════
// RECURSIVE FOLDER COMPONENT
// ═══════════════════════════════════════════════════════════════════════
const TreeNode = ({ node, level = 0, isSearchActive }) => {
  // If we are actively searching, force folders to open. Otherwise, open root folders by default.
  const [isOpen, setIsOpen] = useState(level < 1);
  const Icon = node.icon || ExternalLink;
  const hasChildren = node.children && node.children.length > 0;
  
  // Auto-expand during search
  const currentlyOpen = isSearchActive ? true : isOpen;

  return (
    <div style={{ marginBottom: 12 }}>
      <div 
        style={{ 
          display: "flex", alignItems: "center", background: "#fff", 
          padding: level === 0 ? "20px 24px" : "14px 20px", 
          borderRadius: 12, border: "1px solid #D9E1E3",
          boxShadow: level === 0 ? "0 4px 12px rgba(11,30,38,0.04)" : "none", 
          cursor: hasChildren ? "pointer" : "default",
          transition: "transform 0.1s, box-shadow 0.1s"
        }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        onMouseEnter={(e) => { if (!hasChildren) e.currentTarget.style.transform = "translateX(4px)"; }}
        onMouseLeave={(e) => { if (!hasChildren) e.currentTarget.style.transform = "translateX(0)"; }}
      >
        {/* Expand/Collapse Chevron */}
        {hasChildren ? (
           <div style={{ marginRight: 16, color: "#90A1A7", display: "flex", alignItems: "center" }}>
             {currentlyOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
           </div>
        ) : (
           <div style={{ width: 36 }} /> // Spacer to align child items with folders
        )}
        
        {/* Icon */}
        <div style={{ 
          width: level === 0 ? 44 : 36, height: level === 0 ? 44 : 36, borderRadius: 10, 
          background: level === 0 ? "#E1F1F2" : "#F4F7F8", 
          display: "flex", alignItems: "center", justifyContent: "center", 
          color: level === 0 ? "#0A6A70" : "#5E7178", marginRight: 16 
        }}>
          <Icon size={level === 0 ? 22 : 18} strokeWidth={2.5} />
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
           <h3 style={{ margin: 0, fontSize: level === 0 ? 18 : 15, color: "#0C2027", fontWeight: 700 }}>{node.title}</h3>
           {node.description && <p style={{ margin: "4px 0 0 0", fontSize: 13, color: "#5E7178", lineHeight: 1.4 }}>{node.description}</p>}
        </div>

        {/* Action Button */}
        {node.url && (
          <a 
            href={node.url} 
            target="_blank" 
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              marginLeft: 16, display: "flex", alignItems: "center", gap: 6, 
              padding: "8px 16px", background: level === 0 ? "#0E8A92" : "#E8EDEE", 
              color: level === 0 ? "#fff" : "#0C2027", textDecoration: "none", 
              borderRadius: 8, fontSize: 13, fontWeight: 600, transition: "opacity 0.2s" 
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            Open <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* Children Wrapper */}
      {hasChildren && currentlyOpen && (
        <div style={{ marginLeft: 32, marginTop: 12, borderLeft: "2px solid #E8EDEE", paddingLeft: 20 }}>
          {node.children.map(child => <TreeNode key={child.id} node={child} level={level + 1} isSearchActive={isSearchActive} />)}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// MAIN PORTAL UI
// ═══════════════════════════════════════════════════════════════════════
export default function Portal() {
  const [search, setSearch] = useState("");

  // Recursive search filter so we don't lose the folder structure when searching
  const filterTree = (nodes, query) => {
    if (!query) return nodes;
    const lowerQuery = query.toLowerCase();
    
    return nodes.reduce((acc, node) => {
       const matchesSelf = node.title.toLowerCase().includes(lowerQuery) || (node.description || "").toLowerCase().includes(lowerQuery);
       let filteredChildren = [];
       
       if (node.children) {
          filteredChildren = filterTree(node.children, query);
       }
       
       if (matchesSelf || filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren });
       }
       return acc;
    }, []);
  };

  const filteredData = useMemo(() => filterTree(PORTAL_DATA, search), [search]);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#F4F7F8", minHeight: "100vh", padding: "60px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 50, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: "#0A6A70", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
             <LayoutDashboard size={32} color="#FFF" />
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#0B1E26", margin: "0 0 12px 0", letterSpacing: "-0.5px" }}>
            Shravan's Operations Hub
          </h1>
          <p style={{ fontSize: 17, color: "#5E7178", margin: 0, maxWidth: 500, marginInline: "auto", lineHeight: 1.5 }}>
            Home to all of Shravan (Shaun's) reporting, sheets, data, and tools.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ position: "relative", marginBottom: 40 }}>
          <Search size={20} color="#90A1A7" style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)" }} />
          <input 
            type="text" 
            placeholder="Search folders, tools, reports, or keywords..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              width: "100%", boxSizing: "border-box", padding: "16px 20px 16px 50px", 
              borderRadius: 16, border: "2px solid #D9E1E3", fontSize: 16, 
              outline: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", transition: "border-color 0.2s" 
            }}
            onFocus={(e) => e.target.style.borderColor = "#0E8A92"}
            onBlur={(e) => e.target.style.borderColor = "#D9E1E3"}
          />
        </div>

        {/* Tree Rendering */}
        <div>
          {filteredData.length > 0 ? (
            filteredData.map(node => <TreeNode key={node.id} node={node} isSearchActive={search.length > 0} />)
          ) : (
            <div style={{ padding: 60, textAlign: "center", color: "#90A1A7", background: "#FFF", borderRadius: 16, border: "2px dashed #D9E1E3" }}>
              No reports or folders match your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}