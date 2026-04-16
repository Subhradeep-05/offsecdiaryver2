import React from "react";
import { motion } from "framer-motion";
import { Clock, User, ChevronRight, Terminal, BookOpen } from "lucide-react";
import "./Blogs.css";

const blogPosts = [
  {
    id: "LOG-001",
    title: "Bypassing Modern EDR via Direct Syscalls",
    excerpt: "Exploring the implementation of direct system calls in Go to evade user-mode hooks and monitoring.",
    author: "Root_Admin",
    date: "2024-05-12",
    readTime: "15 min",
    category: "REVERSE ENGINEERING",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800"
  },
  {
    id: "LOG-002",
    title: "OAuth2.0 Flow Exploitation in Cloud Environments",
    excerpt: "A technical breakdown of misconfigured redirect URIs and state parameter bypasses in modern SaaS.",
    author: "Null_Ptr",
    date: "2024-05-08",
    readTime: "12 min",
    category: "WEB SEC",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=800"
  },
  {
    id: "LOG-003",
    title: "Kernel-Mode Rootkit Development: A Deep Dive",
    excerpt: "Understanding the Windows I/O Manager and driver communication for stealthy persistence.",
    author: "Kernel_Dev",
    date: "2024-05-01",
    readTime: "25 min",
    category: "EXPLOIT DEV",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"
  }
];

export default function Blogs() {
  return (
    <div className="blogs-page coming-soon-container">
      <div>
        <div className="coming-soon-header">
          <div className="accent-line left"></div>
          <h1 className="coming-soon-title">COMING SOON</h1>
          <div className="accent-line right"></div>
        </div>
        <p className="coming-soon-subtitle">We're rebuilding the Technical Blogs. Check back soon for deep technical write-ups and research logs.</p>
      </div>
    </div>
  );
}