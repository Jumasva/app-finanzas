<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Correo con el enlace de reactivación. Se envía por la cola, no durante la petición (RNF-REN-005).
 */
class ReactivateAccountNotification extends Notification implements ShouldQueue
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
        // El enlace abre la pantalla del frontend, que luego llama a POST /account/reactivate
        $url = config('app.frontend_url').'/reactivar-cuenta?'.http_build_query([
            'token' => $this->token,
            'email' => $notifiable->email,
        ]);

        return (new MailMessage)
            ->subject(__('reactivation.mail.subject'))
            ->greeting(__('reactivation.mail.greeting', ['name' => $notifiable->name]))
            ->line(__('reactivation.mail.intro'))
            ->action(__('reactivation.mail.action'), $url)
            ->line(__('reactivation.mail.expire', ['count' => config('auth.reactivation.expire')]))
            ->line(__('reactivation.mail.ignore'))
            ->salutation(__('reactivation.mail.salutation'));
    }
}
