
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Printer, ArrowLeft } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  termsAccepted: boolean;
}

interface SuccessMessageProps {
  data: FormData;
  onGeneratePDF: () => void;
  onPrint: () => void;
  onReset: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  data, 
  onGeneratePDF, 
  onPrint, 
  onReset 
}) => {
  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
      <CardHeader className="text-center pb-6 pt-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800">
          Thanks, {data.fullName.split(' ')[0]}!
        </CardTitle>
        <p className="text-slate-600 mt-2">
          Your message has been sent successfully. We'll get back to you within 24 hours.
        </p>
      </CardHeader>
      
      <CardContent className="px-8 pb-8">
        <div id="success-content" className="space-y-4 mb-6 p-6 bg-slate-50 rounded-lg">
          <h3 className="font-semibold text-slate-800 mb-4">Submission Details</h3>
          
          <div className="grid gap-3">
            <div className="flex justify-between">
              <span className="font-medium text-slate-600">Name:</span>
              <span className="text-slate-800">{data.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-600">Email:</span>
              <span className="text-slate-800">{data.email}</span>
            </div>
            {data.phone && (
              <div className="flex justify-between">
                <span className="font-medium text-slate-600">Phone:</span>
                <span className="text-slate-800">{data.phone}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-medium text-slate-600">Subject:</span>
              <span className="text-slate-800 capitalize">{data.subject}</span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <span className="font-medium text-slate-600">Message:</span>
              <p className="text-slate-800 mt-1 text-sm leading-relaxed">{data.message}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onGeneratePDF}
            variant="outline"
            className="flex-1 h-12 border-slate-200 hover:bg-slate-50 transition-all duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          
          <Button
            onClick={onPrint}
            variant="outline"
            className="flex-1 h-12 border-slate-200 hover:bg-slate-50 transition-all duration-200"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Form
          </Button>
          
          <Button
            onClick={onReset}
            className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Send Another
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessMessage;
