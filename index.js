const os = require("node:os");
const fs = require("node:fs");
const path = require("node:path");

function register(
  so,
  arquitetura,
  modeloCPU,
  upTimeDays,
  upTimeHours,
  upTimeMins,
  uptimeSecs,
  usoMemoria
) {
  const logDir = path.join("/", "log");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logFilePath = path.join(logDir, "log.txt");

  fs.appendFileSync(
    logFilePath,
    "DETALHES DO SISTEMA:\nSO: " +
      so +
      "\nArquitetura do sistema: " +
      arquitetura +
      "\nModelo do processador: " +
      modeloCPU[0].model +
      "\nTempo de atividade do sistema: " +
      upTimeDays +
      ":" +
      upTimeHours +
      ":" +
      upTimeMins +
      ":" +
      uptimeSecs +
      " segundos" +
      "\nUso de memória(%): " +
      usoMemoria.toFixed(2) +
      " % da memória \n--------------------------------------------------------------------------------\n"
  );
}

function infos() {
  const so = os.platform();
  const arquitetura = os.arch();
  const modeloCPU = os.cpus();

  const upTimeDays = Math.floor(os.uptime() / 60 / 60 / 24);
  const upTimeDaysInSeconds = upTimeDays * 24 * 60 * 60;

  const upTimeHours = Math.floor((os.uptime() - upTimeDaysInSeconds) / 60 / 60);
  const upTimeHoursInSeconds = upTimeHours * 60 * 60;

  const upTimeMins = Math.floor(
    (os.uptime() - upTimeDaysInSeconds - upTimeHoursInSeconds) / 60
  );
  const upTimeMinsInSeconds = upTimeMins * 60;

  const uptimeSecs = Math.floor(
    os.uptime() -
      upTimeDaysInSeconds -
      upTimeHoursInSeconds -
      upTimeMinsInSeconds
  );

  const memoriaTotal = os.totalmem();
  const memoriaLivre = os.freemem();
  const usoMemoria = 100 - (memoriaLivre / memoriaTotal) * 100;

  console.clear();
  console.log(
    "DETALHES DO SISTEMA:\nSO: " +
      so +
      "\nArquitetura do sistema: " +
      arquitetura +
      "\nModelo do processador: " +
      modeloCPU[0].model +
      "\nTempo de atividade do sistema: " +
      upTimeDays +
      ":" +
      upTimeHours +
      ":" +
      upTimeMins +
      ":" +
      uptimeSecs +
      " segundos" +
      "\nUso de memória(%): " +
      usoMemoria.toFixed(2) +
      " % da memória \n--------------------------------------------------------------------------------"
  );
  register(
    so,
    arquitetura,
    modeloCPU,
    upTimeDays,
    upTimeHours,
    upTimeMins,
    uptimeSecs,
    usoMemoria
  );
}

setInterval(infos, 1000);
