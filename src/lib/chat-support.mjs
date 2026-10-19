// A conservative, deterministic fallback, not a clinical risk assessment.
// Shared by client and server so supportive replies still work during outages.
const normalize = (text) => text.normalize('NFC').replace(/\u0e4d\u0e32/gu, '\u0e33').toLowerCase()
  .replace(/[\s\p{P}\p{S}\u200b-\u200d\uFE0F]/gu, '');
const endings = '(?:ครับ|ค่ะ|คะ|จ้า|จ้ะ|นะ|ฮะ|ค่า|ค้าบ|คับ)*';
const exact = (text, phrases) => new RegExp(`^(?:${phrases})${endings}$`, 'u').test(text);
const mentionsSelfHarm = (text) => /ฆ่าตัวตาย|ทำร้ายตัวเอง|จบชีวิต|ไม่อยากมีชีวิต|ไม่อยากอยู่แล้ว|อยากตาย|อยากหายไปจากโลก|killmyself|suicid|selfharm|endmylife|wanttodie/u.test(normalize(text));

export function immediateSupportReply(messages) {
  const users = messages.filter((message) => message.role === 'user' && typeof message.content === 'string');
  const latest = users.at(-1)?.content;
  if (!latest) return null;
  const text = normalize(latest);
  const riskFollowUp = users.slice(-3, -1).some((message) => mentionsSelfHarm(message.content)) &&
    exact(text, 'บอกได้ไหม|บอกได้มั้ย|ได้ไหม|บอกหน่อย|ทำยังไง|ทำไง|ช่วยหน่อย|ขอวิธี|มีวิธีไหม|แล้วต้องทำยังไง');

  if (mentionsSelfHarm(latest) || riskFollowUp) {
    return 'ขอบคุณที่บอกเรานะคะ เราอยากช่วยให้คุณปลอดภัย และจะไม่บอกวิธีทำร้ายตัวเองค่ะ\n\nถ้าตอนนี้มีของหรือสิ่งที่อาจใช้ทำร้ายตัวเองอยู่ใกล้ ลองถอยออกมาและไปอยู่กับคนที่ไว้ใจได้ ขอให้เขาอยู่เป็นเพื่อนคุณตอนนี้นะคะ\n\nถ้าคุณบาดเจ็บ ทำร้ายตัวเองไปแล้ว หรือรู้สึกว่าอาจลงมือทันที ให้ขอคนใกล้ตัวช่วยติดต่อบริการฉุกเฉินในพื้นที่ หรือพาไปห้องฉุกเฉินใกล้ที่สุดทันทีค่ะ\n\nตอนนี้คุณอยู่คนเดียวไหม และปลอดภัยในช่วงนี้หรือเปล่าคะ';
  }
  if (exact(text, 'เศร้า|เศร้ามาก|เศร้าจัง|เศร้าสุดๆ|รู้สึกเศร้า|วันนี้เศร้า|วันนี้เศร้ามาก')) {
    return 'เราได้ยินว่าตอนนี้คุณรู้สึกเศร้านะคะ 🤍 ถ้าอยากเล่า อะไรทำให้รู้สึกแบบนี้ เราพร้อมฟังโดยไม่ตัดสินค่ะ';
  }
  if (exact(text, 'เหงา|เหงามาก|เหงาจัง|รู้สึกเหงา')) {
    return 'รู้สึกเหงาอยู่ใช่ไหมคะ 🤍 ถ้าอยากมีคนฟัง เล่าให้เราฟังได้ค่ะ วันนี้เป็นอย่างไรบ้าง';
  }
  if (exact(text, 'เครียด|เครียดมาก|เครียดจัง|รู้สึกแย่|แย่มาก|เหนื่อย|เหนื่อยมาก|ท้อ|ท้อมาก|ไม่ไหวแล้ว|ร้องไห้')) {
    return 'ดูเหมือนตอนนี้มีเรื่องหนักใจอยู่นะคะ 🤍 ตอนนี้คุณปลอดภัยอยู่ไหม ถ้าอยากเล่า เราพร้อมฟังค่ะ';
  }
  return null;
}
