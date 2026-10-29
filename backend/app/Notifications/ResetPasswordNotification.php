<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Correo con el enlace de recuperación. Se envía por la cola, no durante la petición (RNF-REN-005).
 */
class ResetPasswordNotification extends Notification implements ShouldQueue
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
        // El enlace abre la pantalla del frontend, que luego llama a POST /auth/reset-password
        $url = config('app.frontend_url').'/restablecer-contrasena?'.http_build_query([
            'token' => $this->token,
            'email' => $notifiable->email,
        ]);

        return (new MailMessage)
            ->subject(__('passwords.mail.subject'))
            ->greeting(__('passwords.mail.greeting', ['name' => $notifiable->name]))
            ->line(__('passwords.mail.intro'))
            ->action(__('passwords.mail.action'), $url)
            ->line(__('passwords.mail.expire', ['count' => config('auth.passwords.users.expire')]))
            ->line(__('passwords.mail.ignore'))
            ->salutation(__('passwords.mail.salutation'));
    }
}
