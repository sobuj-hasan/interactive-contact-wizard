
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormField from './FormField';
import ValidationMessages from './ValidationMessages';
import SuccessMessage from './SuccessMessage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, User, MessageSquare, Download, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  termsAccepted: boolean;
}

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      termsAccepted: false
    }
  });

  const watchedValues = watch();

  const onSubmit = (data: FormData) => {
    setSubmittedData(data);
    setIsSubmitted(true);
    console.log('Form submitted:', data);
  };

  const generatePDF = async () => {
    if (!submittedData) return;

    const pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.text('Contact Form Submission', 20, 30);
    
    pdf.setFontSize(12);
    let yPosition = 50;
    
    pdf.text(`Full Name: ${submittedData.fullName}`, 20, yPosition);
    yPosition += 15;
    pdf.text(`Email: ${submittedData.email}`, 20, yPosition);
    yPosition += 15;
    if (submittedData.phone) {
      pdf.text(`Phone: ${submittedData.phone}`, 20, yPosition);
      yPosition += 15;
    }
    pdf.text(`Subject: ${submittedData.subject}`, 20, yPosition);
    yPosition += 15;
    pdf.text('Message:', 20, yPosition);
    yPosition += 10;
    
    const splitMessage = pdf.splitTextToSize(submittedData.message, 170);
    pdf.text(splitMessage, 20, yPosition);
    
    pdf.save('contact-form-submission.pdf');
  };

  const printForm = () => {
    const printContent = document.getElementById('success-content');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    reset();
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <SuccessMessage 
            data={submittedData} 
            onGeneratePDF={generatePDF}
            onPrint={printForm}
            onReset={resetForm}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8 pt-8">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Get In Touch
            </CardTitle>
            <p className="text-slate-600 mt-2">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                label="Full Name"
                type="text"
                icon={<User className="w-5 h-5" />}
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
                error={errors.fullName?.message}
                value={watchedValues.fullName}
              />

              <FormField
                label="Email Address"
                type="email"
                icon={<Mail className="w-5 h-5" />}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                error={errors.email?.message}
                value={watchedValues.email}
              />

              <FormField
                label="Phone Number (Optional)"
                type="tel"
                icon={<Phone className="w-5 h-5" />}
                {...register('phone', {
                  pattern: {
                    value: /^[\d\s\-\+\(\)]+$/,
                    message: 'Please enter a valid phone number'
                  }
                })}
                error={errors.phone?.message}
                value={watchedValues.phone}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <Select onValueChange={(value) => setValue('subject', value, { shouldValidate: true })}>
                  <SelectTrigger className="h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <ValidationMessages error={errors.subject?.message} />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <Textarea
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 20,
                        message: 'Message must be at least 20 characters'
                      }
                    })}
                    className="pl-10 min-h-[120px] bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <ValidationMessages error={errors.message?.message} />
                <div className="text-xs text-slate-500 text-right">
                  {watchedValues.message?.length || 0}/20 minimum characters
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Checkbox
                  id="terms"
                  {...register('termsAccepted', {
                    required: 'You must accept the terms and conditions'
                  })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="terms" className="text-sm text-slate-700 cursor-pointer">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 underline font-medium">
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 underline font-medium">
                      Privacy Policy
                    </a>
                  </label>
                  <ValidationMessages error={errors.termsAccepted?.message} />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isValid || !watchedValues.termsAccepted}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;
