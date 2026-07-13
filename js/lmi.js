// Lightweight LMI stub — returns canned labor-market insights for careers

const mock = {
  salaryMedian: (title) => {
    if (/engineer|architect|developer/i.test(title)) return 85000;
    if (/designer|creative|product/i.test(title)) return 65000;
    if (/consultant|advisor/i.test(title)) return 72000;
    return 48000;
  },
  growthPct: (title) => {
    if (/AI|Machine|Data|Cloud/i.test(title)) return 18;
    if (/Designer|Creative|Product/i.test(title)) return 9;
    return 6;
  },
  automationRisk: (title) => {
    if (/clerical|admin|accounting/i.test(title)) return 'High';
    if (/engineer|creative|designer/i.test(title)) return 'Low';
    return 'Medium';
  }
};

export function fetchLMIForCareer(title) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title,
        medianSalary: mock.salaryMedian(title),
        projectedGrowthPct: mock.growthPct(title),
        automationRisk: mock.automationRisk(title)
      });
    }, 180);
  });
}
