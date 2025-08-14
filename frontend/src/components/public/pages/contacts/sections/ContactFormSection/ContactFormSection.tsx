'use client'
import { useLocale, useTranslations } from 'next-intl';
import classes from './ContactFormSection.module.scss';
import {
  Send,
  User,
  Building2,
  Phone,
  Mail
} from 'lucide-react';
import { useForms } from '@/hooks/admin/forms';
import { useForm } from 'react-hook-form';
import { CreateFormDto } from '@/lib/api/services/types/forms.types';
import { useToast } from '@/hooks/useToast';
import { Button, Container, Heading, Paragraph, Section } from '@/components/styles';


export const ContactFormSection = () => {
  const t = useTranslations('public.pages.contacts.form');
  const locale = useLocale()
  const create_form_mutation = useForms().useCreate(locale)
  const toast = useToast()

  const form = useForm<CreateFormDto>({
    defaultValues: {
      sender_name: '',
      company_name: '',
      phone_number: '',
      email: '',
      message: '',
    },
  })

  const handleSubmit = async (data: CreateFormDto) => {
    const response = await create_form_mutation.mutateAsync(data)
    toast.info(response.statusText)
    switch (response.statusText) {
      case 'Created':
        toast.success(t('form_sent_success', { id: response.data.id }))
        break
      case 'Bad Request':
        toast.error(t('form_sent_daily_limit_error'))
        break
      default:
        toast.error(t('form_sent_error'))
        break
    }
    form.reset()
  }

  return (
    <Section className={classes.contact_form}>
      <Container>
        <div className={classes.contact_form__content}>
          <div className={classes.contact_form__info}>
            <Heading size='lg' className={classes.contact_form__title}>{t('title')}</Heading>
            <Paragraph size='lg' className={classes.contact_form__description}>
              {t('description')}
            </Paragraph>
            <div className={classes.contact_form__benefits}>
              {t.raw('benefits').map((benefit: string, index: number) => (
                <div key={index} className={classes.benefit_item}>
                  <span className={classes.benefit_item__icon}>✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <form className={classes.contact_form__form} onSubmit={form.handleSubmit(handleSubmit)}>
            <div className={classes.form_row}>
              <div className={classes.form_group}>
                <label htmlFor="sender_name">{t('fields.name')}</label>
                <div className={classes.input_wrapper}>
                  <User size={18} />
                  <input
                    type="text"
                    id="sender_name"
                    minLength={1}
                    maxLength={1024}
                    placeholder={t('placeholders.name')}
                    required
                    {...form.register('sender_name')}
                  />
                </div>
              </div>
              <div className={classes.form_group}>
                <label htmlFor="company_name">{t('fields.company')}</label>
                <div className={classes.input_wrapper}>
                  <Building2 size={18} />
                  <input
                    type="text"
                    id="company_name"
                    placeholder={t('placeholders.company')}
                    minLength={1}
                    maxLength={1024}
                    {...form.register('company_name')}
                  />
                </div>
              </div>
            </div>

            <div className={classes.form_row}>
              <div className={classes.form_group}>
                <label htmlFor="phone_number">{t('fields.phone')}</label>
                <div className={classes.input_wrapper}>
                  <Phone size={18} />
                  <input
                    type="tel"
                    id="phone_number"
                    placeholder={t('placeholders.phone')}
                    required
                    {...form.register('phone_number')}
                  />
                </div>
              </div>
              <div className={classes.form_group}>
                <label htmlFor="email">{t('fields.email')}</label>
                <div className={classes.input_wrapper}>
                  <Mail size={18} />
                  <input
                    type="email"
                    id="email"
                    minLength={3}
                    maxLength={255}
                    placeholder={t('placeholders.email')}
                    required
                    {...form.register('email')}
                  />
                </div>
              </div>
            </div>

            <div className={classes.form_group}>
              <label htmlFor="message">{t('fields.message')}</label>
              <textarea
                id="message"
                rows={5}
                minLength={3}
                maxLength={8192}
                placeholder={t('placeholders.message')}
                required
                {...form.register('message')}
              />
            </div>

            <Button variant='primary' type="submit" className={classes.submit_button}>
              <Send size={20} />
              <span>{t('submit')}</span>
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  );
}; 