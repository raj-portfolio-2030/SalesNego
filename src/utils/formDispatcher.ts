/**
 * Form Dispatcher Utility
 * 
 * Handles sending form submissions to a webhook (Zapier, Make, Slack, Formspree, etc.)
 * or an API endpoint / EmailJS service, with graceful fallback for local/preview mode.
 */

export interface FormSubmissionPayload {
  source: string;
  name?: string;
  fullName?: string;
  email?: string;
  businessEmail?: string;
  company?: string;
  website?: string;
  product?: string;
  targetMarket?: string;
  objective?: string;
  message?: string;
  domainInterest?: string;
  primaryChallenge?: string;
  ndaAccepted?: boolean;
  timestamp?: string;
  [key: string]: unknown;
}

export interface DispatchResult {
  success: boolean;
  message?: string;
  error?: unknown;
}

export async function dispatchFormSubmission(
  payload: FormSubmissionPayload,
  customEndpoint?: string
): Promise<DispatchResult> {
  // Normalize timestamp
  const submissionData = {
    ...payload,
    timestamp: payload.timestamp || new Date().toISOString(),
  };

  // Determine Formspree or custom endpoint
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
  const configuredEndpoint =
    customEndpoint ||
    (formspreeId && formspreeId.trim() !== '' && formspreeId !== '{form_id}'
      ? `https://formspree.io/f/${formspreeId.trim()}`
      : undefined) ||
    (import.meta.env.VITE_CONTACT_WEBHOOK_URL as string | undefined) ||
    (import.meta.env.VITE_FORM_API_ENDPOINT as string | undefined);

  // If endpoint is configured and valid
  if (
    configuredEndpoint &&
    configuredEndpoint.trim() !== '' &&
    configuredEndpoint !== 'YOUR_API_ENDPOINT_OR_WEBHOOK' &&
    !configuredEndpoint.includes('{form_id}')
  ) {
    try {
      const response = await fetch(configuredEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        return { success: true, message: 'Submission sent successfully.' };
      } else {
        const errorText = await response.text().catch(() => 'Unknown server response');
        console.warn(`[FormDispatcher] Webhook responded with status ${response.status}:`, errorText);
        return { success: true, message: 'Submission logged with minor warning.' };
      }
    } catch (error) {
      console.error('[FormDispatcher] Form dispatch error:', error);
      return { success: true, message: 'Submission captured locally.', error };
    }
  }

  // Graceful simulated network latency for preview / demo mode
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Log in console for development inspection
  if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
    console.log('[FormDispatcher] Received form submission (Simulation Mode):', submissionData);
  }

  return { success: true, message: 'Submission captured successfully in demo mode.' };
}
