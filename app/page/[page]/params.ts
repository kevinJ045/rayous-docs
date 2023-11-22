import { Sequence } from "@/app/constant/sequence";

export function params(){
	let seq: string[] = [];
	Sequence.filter(t => typeof t == "string").forEach((t: string) => seq.push(t));
	Sequence.filter(t => Array.isArray(t)).forEach((t: string[]) => seq.push(...t.slice(1, t.length)));
	return seq.map(t => ({ page: t }));
}