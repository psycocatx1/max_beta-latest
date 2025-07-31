'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/intl';
import { useAuth } from '@/hooks/useAuth/useAuth';
import { FormInput } from '../common/FormInput';
import styles from './LoginForm.module.scss';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const t = useTranslations('public.pages.auth.login');
  const { login, auth_error, is_login_loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <div className={styles.login_container}>
      <h1 className={styles.title} data-intl-key="public.pages.auth.login.title">
        {t('title')}
      </h1>

      {auth_error && (
        <div className={styles.error_message} data-intl-key="public.pages.auth.login.error">
          {auth_error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormInput
          id="email"
          type="email"
          label={t('email_label')}
          register={register}
          errors={errors}
          placeholder={t('email_placeholder')}
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
          placeholder={t('password_placeholder')}
          validation={{
            required: t('validation.password_required'),
            minLength: {
              value: 6,
              message: t('validation.password_min')
            }
          }}
        />

        <button
          type="submit"
          className={styles.submit_button}
          disabled={is_login_loading}
          data-intl-key="public.pages.auth.login.submit"
        >
          {is_login_loading ? t('loading') : t('submit')}
        </button>
      </form>

      <p className={styles.register_link} data-intl-key="public.pages.auth.login.footer.no_account">
        {t('footer.no_account')}{' '}
        <Link href="/auth/register" data-intl-key="public.pages.auth.login.footer.register_link">
          {t('footer.register_link')}
        </Link>
      </p>
    </div>
  );
}; 