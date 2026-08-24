import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const rule = await db.rule.update({
    where: { id },
    data: {
      ...(body.name !== undefined ? { name: String(body.name) } : {}),
      ...(body.ruleType !== undefined ? { ruleType: String(body.ruleType) } : {}),
      ...(body.parameters !== undefined ? { parametersJson: JSON.stringify(body.parameters) } : {}),
      ...(body.enabled !== undefined ? { enabled: Boolean(body.enabled) } : {}),
    },
  });
  return NextResponse.json({ rule });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  await db.rule.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
