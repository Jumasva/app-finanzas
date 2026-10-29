<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Correo con el enlace para verificar el correo. Se envía por la cola, no durante la petición (RNF-REN-005).
 */
class VerifyEmailNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(#[\SensitiveParameter] public string $token) {}

    /**
     * @return array<int, string>
     */
    public function via(User $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(User $notifiable): MailMessage
    {
        // El enlace abre la pantalla del frontend, que luego llama a POST /auth/verify-email
        $url = config('app.frontend_url').'/verificar-correo?'.http_build_query([
            'token' => $this->token,
            'email' => $notifiable->email,
        ]);

        return (new MailMessage)
            ->subject(__('verification.mail.subject'))
            ->greeting(__('verification.mail.greeting', ['name' => $notifiable->name]))
            ->line(__('verification.mail.intro'))
            ->action(__('verification.mail.action'), $url)
            ->line(__('verification.mail.expire', ['count' => config('auth.verification.expire') / 60]))
            ->line(__('verification.mail.ignore'))
            ->salutation(__('verification.mail.salutation'));
    }
}
