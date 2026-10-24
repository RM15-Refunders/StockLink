# StockLink 中文说明

StockLink 面向马来西亚微型和小型企业，把客户订单、配方用量、现有库存和预计到货联系起来，展示未来七天的库存风险。

[在线演示](https://stock-link.replit.app/) · [英文首页](../README.md) · [演示步骤](demo-guide.md) · [架构说明](architecture.md)

## 当前功能

- 库存预测及风险解释。
- 创建和编辑草稿订单、确认或取消订单、调整配方。
- 修改库存、安全库存、每日基础需求，记录库存调整。
- 查看示例采购单，确认收货或取消到货。
- 查看操作记录，批准或拒绝建议。

数据是虚构的，改动保存在本浏览器的 localStorage 中。没有账号登录、多人共享业务数据库、真实 AI、自动采购或供应商消息。批准建议仅记录人的决定。

## 启动

推荐 Linux x64；Windows 使用 WSL2。使用 Node.js 24、pnpm 10.26.1，在仓库根目录执行：

```sh
pnpm install --frozen-lockfile
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/stocklink run dev
```

打开 http://localhost:3000。检查并构建：

```sh
PORT=3000 BASE_PATH=/ pnpm run build
```

PORT 和 BASE_PATH 必须在启动前提供。原生 Windows/macOS 尚未验证，当前工作区排除了部分非 Linux 原生依赖。

当前团队分工、参赛说明和材料状态见 [competition-reference.md](competition-reference.md)。协作请参考 [CONTRIBUTING.md](../CONTRIBUTING.md)。尚未接入的服务和未提交的证明材料不计为完成。

## 使用证明与工具声明

- [Replit 使用证明](replit-usage-evidence.md)：采用可公开访问的在线演示网址作为证明。
- [技术工具声明](tech-tools-declaration.md)：分别记录开发辅助 AI 和应用实际能力。
- [依赖清单](dependency-inventory.md)：实际依赖版本和上游许可证信息。
- 团队未使用 RunPod；当前演示没有 GPU 训练、微调或模型推理。
