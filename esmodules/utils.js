import * as module from "./moduleVariables.js"

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function useWebhook(blob, message) {
  console.log("Начинаем отправку в дискорд.");
  const startTime = performance.now();
  const webhookUrl = module.Settings.webhookUrl;

  if (!webhookUrl) {
    throw new Error("Не задан URL вебхука Discord!");
  }

  const formData = new FormData();
  if (blob) formData.append("file", blob, `scene_${Date.now()}.webp`);
  if (message) formData.append("content", message);

  const response = await fetch(webhookUrl, {
    method: "POST",
    body: formData,
  });

  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`Отправка завершена. Время отправки: ${duration.toFixed(2)} мс`);

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
}

export class Mutex {
  constructor() {
    this._locked = false;
    this._queue = [];
  }

  lock() {
    return new Promise((resolve) => {
      if (!this._locked) {
        this._locked = true;
        resolve();
      } else {
        this._queue.push(resolve);
      }
    });
  }

  unlock() {
    if (this._queue.length > 0) {
      const nextResolve = this._queue.shift();
      nextResolve();
    } else {
      this._locked = false;
    }
  }
}