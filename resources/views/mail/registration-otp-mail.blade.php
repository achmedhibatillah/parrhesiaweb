<x-mail::message>
# Kode OTP Pendaftaran

Hai,

Terimakasih telah melakukan pendaftaran akun di **Sistem Informasi Laboratorium Parrhesia**.

Berikut adalah **kode OTP** untuk pendaftaran akun Anda:

<x-mail::panel>
{{ $otp }}
</x-mail::panel>

Kode ini hanya berlaku **5 menit**. Jangan berikan kode ini ke siapapun.

Terima kasih,<br>
{{ config('app.name') }}
</x-mail::message>