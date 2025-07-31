'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/intl';
import { useAuth } from '@/hooks/useAuth/useAuth';
import { FormInput } from '../common/FormInput';
import styles from './RegisterForm.module.scss';
interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const RegisterForm = () => {
  const t = useTranslations('public.pages.auth.register');
  const { register: registerUser, auth_error, is_register_loading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data);
  };

  return (
    <div className={styles.register_container}>
      <h1 className={styles.title} data-intl-key="public.pages.auth.register.title">
        {t('title')}
      </h1>

      {auth_error && (
        <div className={styles.error_message} data-intl-key="public.pages.auth.register.error">
          {auth_error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormInput
          id="name"
          type="text"
          label={t('name_label')}
          register={register}
          errors={errors}
          translation_key="public.pages.auth.register"
          validation={{
            required: t('validation.name_required'),
            minLength: {
              value: 2,
              message: t('validation.name_min')
            }
          }}
        />

        <FormInput
          id="email"
          type="email"
          label={t('email_label')}
          register={register}
          errors={errors}
          translation_key="public.pages.auth.register"
          validation={{
            required: t('validation.email_required'),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('validation.email_invalid')
            }
          }}
        />

        <FormInput
          id="password"
          type="password"
          label={t('password_label')}
          register={register}
          errors={errors}
          translation_key="public.pages.auth.register"
          validation={{
            required: t('validation.password_required'),
            minLength: {
              value: 6,
              message: t('validation.password_min')
            }
          }}
        />

        <FormInput
          id="password_confirmation"
          type="password"
          label={t('password_confirmation_label')}
          register={register}
          errors={errors}
          translation_key="public.pages.auth.register"
          validation={{
            required: t('validation.password_confirmation_required'),
            validate: (value: string) =>
              value === password || t('validation.passwords_match')
          }}
        />

        <button
          type="submit"
          className={styles.submit_button}
          disabled={is_register_loading}
          data-intl-key="public.pages.auth.register.submit"
        >
          {is_register_loading ? t('loading') : t('submit')}
        </button>
      </form>

      <p className={styles.login_link} data-intl-key="public.pages.auth.register.footer.have_account">
        {t('footer.have_account')}{' '}
        <Link href="/auth/login" data-intl-key="public.pages.auth.register.footer.login_link">
          {t('footer.login_link')}
        </Link>
      </p>
    </div>
  );
}; 