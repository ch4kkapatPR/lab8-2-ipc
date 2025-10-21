const { contextBridge, ipcRenderer } = require('electron');

console.log('🌉 [PRELOAD] กำลังตั้งค่า security bridge...');


contextBridge.exposeInMainWorld('electronAPI', {
  // ฟังก์ชันเดิม
  sendMessage: (message) => {
    console.log('📤 [PRELOAD] ส่งข้อความ:', message);
    return ipcRenderer.invoke('send-message', message);
  },
  
  sayHello: (name) => {
    console.log('👋 [PRELOAD] ส่งคำทักทาย:', name);
    return ipcRenderer.invoke('say-hello', name);
  },
  
  // ฟังก์ชันใหม่สำหรับ agent wallboard
  getAgents: () => {
    console.log('📊 [PRELOAD] ร้องขอข้อมูล agents');
    return ipcRenderer.invoke('get-agents');
  },
  
  changeAgentStatus: (agentId, newStatus) => {
    console.log(`🔄 [PRELOAD] เปลี่ยนสถานะ ${agentId} เป็น ${newStatus}`);
    return ipcRenderer.invoke('change-agent-status', { agentId, newStatus });
  },

  // ฟังก์ชัน login
  login: (agentId, password) => {
    console.log('🌉 [PRELOAD] Sending login request:', agentId);
    return ipcRenderer.invoke('login', { agentId, password });
  },
  
  // ฟังก์ชันใหม่: ฟัง Notification
  onAgentStatusChanged: (callback) => {
    ipcRenderer.on('agent-status-changed', (event, data) => {
      callback(data);
    });
  }
});

console.log('✅ [PRELOAD] Security bridge พร้อมแล้ว');