import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { sendContactEmail } from '../mailer';
import type { ApiResponse } from '../types';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2, 'Name too short').max(100),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message too short').max(2000),
});

// POST /api/contact
router.post('/', async (req: Request, res: Response<ApiResponse>) => {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.errors[0]?.message ?? 'Validation failed';
    return res.status(400).json({ success: false, message: firstError });
  }

  try {
    await sendContactEmail(result.data);
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully. I will get back to you soon!',
    });
  } catch (err) {
    console.error('[Contact] Email send failed:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
});

export default router;
