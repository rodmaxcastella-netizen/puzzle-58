import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, Cpu, MessageSquare } from 'lucide-react';
import heroBg from './assets/hero-bg.png';
import { useRealtime } from './hooks/useRealtime';
import './styles/App.css';

function App() {
  const { currentImage, status, isProcessing, triggerUpdate } = useRealtime(heroBg);

  return (
    <div className="app-container">
      <header className="navbar">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          HYPERCAR<span>.</span>
        </motion.div>
        <nav>
          <ul>
            <motion.li initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}><a href="#home">Home</a></motion.li>
            <motion.li initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><a href="#performance">Performance</a></motion.li>
            <motion.li initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}><a href="#technology">Technology</a></motion.li>
            <motion.li initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}><a href="#contact">Contact</a></motion.li>
          </ul>
        </nav>
      </header>
      
      <main>
        <section className="hero">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="hero-title">NEXT GEN VELOCITY</h1>
              <p className="hero-subtitle">Experience the pinnacle of automotive engineering and real-time performance tracking.</p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={triggerUpdate}>EXPLORE MODELS</button>
                <button className="btn btn-outline">LEARN MORE</button>
              </div>
            </motion.div>
          </div>
          
          <div className="hero-background-container">
            <div className="hero-background-overlay"></div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="hero-background-image"
                style={{ backgroundImage: `url(${currentImage})` }}
              ></motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className={`status-indicator ${isProcessing ? 'processing' : ''}`}>
          <div className={`status-dot ${isProcessing ? 'pulse-orange' : 'online'}`}></div>
          <span>SIGNAL: {status}</span>
        </div>
        
        <div className="console-overlay glass">
          <div className="console-item">
            <Cpu size={14} />
            <span>CPU: 42%</span>
          </div>
          <div className="console-item">
            <Activity size={14} />
            <span>LATENCY: 12ms</span>
          </div>
        </div>

        <div className="copyright">
          &copy; 2026 HYPERCAR SYSTEMS. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}

export default App;
