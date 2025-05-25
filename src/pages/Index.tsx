import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, CheckCircle, Building, User, Mail, MessageSquare, Award, Linkedin } from 'lucide-react';

interface FormData {
  fullName: string;
  businessName: string;
  email: string;
  problemBefore: string;
  workingExperience: string;
  finalWebsiteFeeling: string;
  resultsNoticed: string;
  leaveTestimonial: string;
  testimonialText: string;
  displayPermission: string;
  linkedinRecommendation: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    businessName: '',
    email: '',
    problemBefore: '',
    workingExperience: '',
    finalWebsiteFeeling: '',
    resultsNoticed: '',
    leaveTestimonial: '',
    testimonialText: '',
    displayPermission: '',
    linkedinRecommendation: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    }
    
    if (step === 2) {
      if (!formData.problemBefore.trim()) newErrors.problemBefore = 'This field is required';
      if (!formData.workingExperience.trim()) newErrors.workingExperience = 'This field is required';
      if (!formData.finalWebsiteFeeling.trim()) newErrors.finalWebsiteFeeling = 'This field is required';
    }
    
    if (step === 3) {
      if (!formData.leaveTestimonial) newErrors.leaveTestimonial = 'Please select an option';
      if (formData.leaveTestimonial === 'yes' && !formData.testimonialText.trim()) {
        newErrors.testimonialText = 'Testimonial text is required';
      }
    }
    
    if (step === 4) {
      if (formData.leaveTestimonial === 'yes') {
        if (!formData.displayPermission) newErrors.displayPermission = 'Please select an option';
        if (!formData.linkedinRecommendation) newErrors.linkedinRecommendation = 'Please select an option';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 3 && formData.leaveTestimonial === 'no') {
        // Skip step 4 if user doesn't want to leave testimonial
        setShowConfetti(true);
        setTimeout(() => {
          setShowThankYou(true);
          setShowConfetti(false);
        }, 2000);
      } else if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowThankYou(true);
        setShowConfetti(false);
      }, 2000);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        >
          {['🎉', '✨', '💙', '⭐', '🌟'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </div>
  );

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-blue-100 transform transition-all duration-500 scale-100 opacity-100">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              Thank You So Much! ❤️
            </h1>
            <p className="text-xl text-blue-600 mb-6">
              Your feedback means the world to me! ✨
            </p>
            <p className="text-gray-600 mb-8">
              I truly appreciate you taking the time to share your experience. 
              Your insights help me grow and serve my clients better! 🌟
            </p>
            <div className="flex justify-center space-x-4">
              <span className="text-2xl animate-bounce">😊</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>💙</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🚀</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <User className="text-blue-500" size={24} />
              <h2 className="text-2xl font-bold text-blue-800">Let's Start with the Basics! 👋</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-blue-700 font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    errors.fullName ? 'border-red-300 bg-red-50' : 'border-blue-200 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  placeholder="Your beautiful name ✨"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-blue-700 font-medium mb-2">
                  Business or Organization Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="Your amazing business 🏢"
                />
              </div>

              <div>
                <label className="block text-blue-700 font-medium mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-blue-200 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                  placeholder="your@email.com 📧"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-blue-500" size={24} />
              <h2 className="text-2xl font-bold text-blue-800">Tell Me About Your Experience! 💭</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-blue-700 font-medium mb-2">
                  What problem were you facing before we worked together? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.problemBefore}
                  onChange={(e) => handleInputChange('problemBefore', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    errors.problemBefore ? 'border-red-300 bg-red-50' : 'border-blue-200 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none text-gray-900`}
                  placeholder="Share your challenges before we started working together... 🤔"
                />
                {errors.problemBefore && <p className="text-red-500 text-sm mt-1">{errors.problemBefore}</p>}
              </div>

              <div>
                <label className="block text-blue-700 font-medium mb-2">
                  What was it like working with me? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.workingExperience}
                  onChange={(e) => handleInputChange('workingExperience', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    errors.workingExperience ? 'border-red-300 bg-red-50' : 'border-blue-200 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none text-gray-900`}
                  placeholder="Describe our collaboration process... 🤝"
                />
                {errors.workingExperience && <p className="text-red-500 text-sm mt-1">{errors.workingExperience}</p>}
              </div>

              <div>
                <label className="block text-blue-700 font-medium mb-2">
                  How do you feel about the final website? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.finalWebsiteFeeling}
                  onChange={(e) => handleInputChange('finalWebsiteFeeling', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    errors.finalWebsiteFeeling ? 'border-red-300 bg-red-50' : 'border-blue-200 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none text-gray-900`}
                  placeholder="Share your thoughts on the final result... 🎯"
                />
                {errors.finalWebsiteFeeling && <p className="text-red-500 text-sm mt-1">{errors.finalWebsiteFeeling}</p>}
              </div>

              <div>
                <label className="block text-blue-700 font-medium mb-2">
                  What results or benefits have you noticed since the website went live?
                </label>
                <textarea
                  value={formData.resultsNoticed}
                  onChange={(e) => handleInputChange('resultsNoticed', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none text-gray-900"
                  placeholder="Any improvements in traffic, sales, or engagement? 📈"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Star className="text-yellow-500" size={24} />
              <h2 className="text-2xl font-bold text-blue-800">Would You Like to Leave a Testimonial? ⭐</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-blue-700 font-medium mb-4">
                  Would you like to leave a testimonial I can use on my portfolio/website? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'yes', label: 'Yes, I\'d love to! 💙', emoji: '✨' },
                    { value: 'no', label: 'No, but thank you for asking 😊', emoji: '🤗' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                      <input
                        type="radio"
                        name="leaveTestimonial"
                        value={option.value}
                        checked={formData.leaveTestimonial === option.value}
                        onChange={(e) => handleInputChange('leaveTestimonial', e.target.value)}
                        className="w-5 h-5 text-blue-500"
                      />
                      <span className="text-lg">{option.emoji}</span>
                      <span className="text-blue-700 font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.leaveTestimonial && <p className="text-red-500 text-sm mt-1">{errors.leaveTestimonial}</p>}
              </div>

              {formData.leaveTestimonial === 'yes' && (
                <div className="transition-all duration-300 opacity-100">
                  <label className="block text-blue-700 font-medium mb-2">
                    Your Testimonial <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.testimonialText}
                    onChange={(e) => handleInputChange('testimonialText', e.target.value)}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                      errors.testimonialText ? 'border-red-300 bg-red-50' : 'border-blue-200 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none text-gray-900`}
                    placeholder="Write your amazing testimonial here... 🌟"
                  />
                  {errors.testimonialText && <p className="text-red-500 text-sm mt-1">{errors.testimonialText}</p>}
                </div>
              )}

              {formData.leaveTestimonial === 'no' && (
                <div className="transition-all duration-300 opacity-100 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-700 text-center">
                    No worries at all! Thank you so much for taking the time to provide feedback. 
                    Your input is incredibly valuable! 💙
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-purple-500" size={24} />
              <h2 className="text-2xl font-bold text-blue-800">Final Details! 🎯</h2>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="block text-blue-700 font-medium mb-4">
                  May I display your name and business name with your testimonial? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'name-business', label: 'Yes, name and business 🏢', emoji: '👍' },
                    { value: 'name-only', label: 'Yes, name only 👤', emoji: '👤' },
                    { value: 'business-only', label: 'Yes, business name only 🏢', emoji: '🏢' },
                    { value: 'anonymous', label: 'No, keep anonymous 🕶️', emoji: '🔒' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                      <input
                        type="radio"
                        name="displayPermission"
                        value={option.value}
                        checked={formData.displayPermission === option.value}
                        onChange={(e) => handleInputChange('displayPermission', e.target.value)}
                        className="w-5 h-5 text-blue-500"
                      />
                      <span className="text-lg">{option.emoji}</span>
                      <span className="text-blue-700 font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.displayPermission && <p className="text-red-500 text-sm mt-1">{errors.displayPermission}</p>}
              </div>

              <div>
                <label className="block text-blue-700 font-medium mb-4">
                  Would you be open to leaving this recommendation on my LinkedIn profile as well? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'yes', label: 'Yes, absolutely! 💼', emoji: '✅' },
                    { value: 'maybe', label: 'Maybe later ⏰', emoji: '🤔' },
                    { value: 'no', label: 'No, thank you 😊', emoji: '❌' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                      <input
                        type="radio"
                        name="linkedinRecommendation"
                        value={option.value}
                        checked={formData.linkedinRecommendation === option.value}
                        onChange={(e) => handleInputChange('linkedinRecommendation', e.target.value)}
                        className="w-5 h-5 text-blue-500"
                      />
                      <span className="text-lg">{option.emoji}</span>
                      <span className="text-blue-700 font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.linkedinRecommendation && <p className="text-red-500 text-sm mt-1">{errors.linkedinRecommendation}</p>}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-2 flex items-center justify-center gap-2">
              <Heart className="text-red-500" />
              Share Your Experience
              <Sparkles className="text-yellow-500" />
            </h1>
            <p className="text-blue-600">Help me improve by sharing your thoughts! ✨</p>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-blue-600">Progress</span>
              <span className="text-sm text-blue-600">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step <= currentStep
                      ? 'bg-blue-500 text-white shadow-lg scale-110'
                      : 'bg-blue-100 text-blue-400'
                  }`}
                >
                  {step < currentStep ? <CheckCircle size={16} /> : step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
          
          {/* Step Content */}
          <div key={currentStep} className="transition-all duration-300 opacity-100">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="px-8 py-6 bg-blue-50 border-t border-blue-100">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  currentStep === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-blue-600 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-400'
                }`}
              >
                ← Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Sparkles size={20} />
                  Submit Feedback! 🎉
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;