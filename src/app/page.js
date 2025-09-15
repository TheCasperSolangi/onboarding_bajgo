"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ChevronRight, 
  ChevronLeft, 
  Package, 
  Store, 
  Globe, 
  Settings, 
  Key, 
  UserPlus, 
  Server,
  Check,
  ExternalLink,
  Copy,
  Database,
  Cloud,
  Terminal,
  AlertCircle,
  Coffee,
  Clock,
  Zap,
  Shield,
  Rocket,
  CheckCircle
} from 'lucide-react';

const DeploymentDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleThankYouClick = () => {
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
        <CardContent className="p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
          </div>

          {/* Main heading */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Thank You for Choosing Us!
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-6 text-lg">
            Your store is being activated. Once it is complete, we will notify you via email. 
            This usually takes 10-14 minutes, but in some cases, it may take up to 1 hour.
          </p>

          {/* Thank You Button */}
          <Button 
            onClick={handleThankYouClick}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
          >
            Thank You
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const OnboardingApp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [deploymentResult, setDeploymentResult] = useState(null);
  const [deploymentError, setDeploymentError] = useState(null);
  const [showDeploymentDialog, setShowDeploymentDialog] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [deploymentTimeRemaining, setDeploymentTimeRemaining] = useState(600); // 10 minutes in seconds

const [formData, setFormData] = useState({
  package: '',
  storeName: '',
  ownerName: '',
  ownerEmail: '',
  ownerPhone: '',
  subdomain: '',
  services: {
    google: false,
    facebook: false,
    stripe: false,
    paypal: false,
  },
  serviceCredentials: {
    googleClientId: '',
    googleClientSecret: '',
    facebookAppId: '',
    facebookAppSecret: '',
    stripePublishableKey: '',
    stripeSecretKey: '',
    paypalClientId: '',
    paypalClientSecret: '',
  },
  adminCredentials: {
    adminEmail: '',
    adminPassword: '',
    confirmPassword: '',
  },
  paymentCredentials: { // Added initialization
    cardNumber: '',
    expiry: '',
    cvv: '',
  },
});

  const packages = [
    {
      id: 'basic',
      name: 'Basic Store',
      price: '$29/month',
      features: ['Up to 100 products', 'Basic analytics', 'Email support', 'SSL certificate']
    },
    {
      id: 'professional',
      name: 'Professional Store',
      price: '$79/month',
      features: ['Up to 1000 products', 'Advanced analytics', 'Priority support', 'Custom domain', 'Marketing tools']
    },
    {
      id: 'enterprise',
      name: 'Enterprise Store',
      price: '$199/month',
      features: ['Unlimited products', 'Custom integrations', '24/7 phone support', 'Multi-store management', 'Advanced reporting']
    }
  ];

  const steps = [
    { number: 1, title: 'Select Package', icon: Package },
    { number: 2, title: 'Store Details', icon: Store },
    { number: 3, title: 'Subdomain', icon: Globe },
    { number: 4, title: 'Services', icon: Settings },
    { number: 5, title: 'Credentials', icon: Key },
    { number: 6, title: 'Admin Setup', icon: UserPlus },
    { number: 7, title: 'Deployment', icon: Server }
  ];

  // Deployment progress simulation
  useEffect(() => {
    if (!showDeploymentDialog) return;

    const progressInterval = setInterval(() => {
      setDeploymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Simulate realistic deployment progress
        return prev + Math.random() * 0.5 + 0.1;
      });
    }, 1000);

    const timerInterval = setInterval(() => {
      setDeploymentTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(timerInterval);
    };
  }, [showDeploymentDialog]);

  // Complete deployment when progress reaches 100%
  useEffect(() => {
    if (deploymentProgress >= 100 && showDeploymentDialog) {
      setTimeout(() => {
        setShowDeploymentDialog(false);
        setIsLoading(false);
        // Simulate successful deployment result
        setDeploymentResult({
          clientId: 'store_' + Math.random().toString(36).substr(2, 9),
          urls: {
            storefront: `https://${formData.subdomain}.bajgo.com`,
            admin: `https://${formData.subdomain}.bajgo.com/admin`,
            api: `https://api.${formData.subdomain}.bajgo.com`
          }
        });
        setCurrentStep(8); // Move to success step
      }, 2000);
    }
  }, [deploymentProgress, showDeploymentDialog, formData.subdomain]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

// Example updateNestedFormData function (adjust based on your implementation)
const updateNestedFormData = (parentKey, key, value) => {
  setFormData((prev) => ({
    ...prev,
    [parentKey]: {
      ...prev[parentKey],
      [key]: value,
    },
  }));
};

  const deployStore = async () => {
    setIsLoading(true);
    setDeploymentError(null);
    setDeploymentResult(null);
    setDeploymentProgress(0);
    setDeploymentTimeRemaining(600);
    setShowDeploymentDialog(true);
    
    try {
      // Prepare the request body with all user selections and data
      const requestBody = {
        package: formData.package,
       
          storeName: formData.storeName,
          ownerName: formData.ownerName,
          ownerEmail: formData.ownerEmail,
          ownerPhone: formData.ownerPhone,
      
        subdomain: formData.subdomain,
        services: formData.services,
        serviceCredentials: {
          // Only include credentials for enabled services
          ...(formData.services.google && {
            google: {
              clientId: formData.serviceCredentials.googleClientId,
              clientSecret: formData.serviceCredentials.googleClientSecret
            }
          }),
          ...(formData.services.facebook && {
            facebook: {
              appId: formData.serviceCredentials.facebookAppId,
              appSecret: formData.serviceCredentials.facebookAppSecret
            }
          }),
          ...(formData.services.stripe && {
            stripe: {
              publishableKey: formData.serviceCredentials.stripePublishableKey,
              secretKey: formData.serviceCredentials.stripeSecretKey
            }
          }),
          ...(formData.services.paypal && {
            paypal: {
              clientId: formData.serviceCredentials.paypalClientId,
              clientSecret: formData.serviceCredentials.paypalClientSecret
            }
          })
        },
        adminCredentials: {
          email: formData.adminCredentials.adminEmail,
          password: formData.adminCredentials.adminPassword,
          confirmPassword: formData.adminCredentials.adminPassword
        }
      };

      // Send POST request to the onboarding API
      const response = await fetch('https://onboarding-api.bajgo.com/api/vendors/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // The actual API response will be handled by the progress simulation
      // const result = await response.json();
      
    } catch (error) {
      console.error('Deployment failed:', error);
      setDeploymentError(error.message);
      setShowDeploymentDialog(false);
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 7) {
      deployStore();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

const isStepValid = () => {
  switch (currentStep) {
    case 1:
      return formData.package !== '';
    case 2:
      return formData.storeName && formData.ownerName && formData.ownerEmail && formData.ownerPhone;
    case 3:
      return formData.subdomain !== '';
    case 4:
      return Object.values(formData.services).some(Boolean);
    case 5:
      const { services, serviceCredentials } = formData;
      let valid = true;
      if (services.google && (!serviceCredentials.googleClientId || !serviceCredentials.googleClientSecret)) {
        valid = false;
      }
      if (services.facebook && (!serviceCredentials.facebookAppId || !serviceCredentials.facebookAppSecret)) {
        valid = false;
      }
      if (services.stripe && (!serviceCredentials.stripePublishableKey || !serviceCredentials.stripeSecretKey)) {
        valid = false;
      }
      if (services.paypal && (!serviceCredentials.paypalClientId || !serviceCredentials.paypalClientSecret)) {
        valid = false;
      }
      return valid;
    case 6:
      return (
        formData.adminCredentials.adminEmail &&
        formData.adminCredentials.adminPassword &&
        formData.adminCredentials.confirmPassword &&
        formData.adminCredentials.adminPassword === formData.adminCredentials.confirmPassword
      );
    case 7:
      return (
        formData.paymentCredentials.cardNumber === '4242424242424242' &&
        formData.paymentCredentials.expiry === '08/29' &&
        formData.paymentCredentials.cvv === '009'
      );
    default:
      return true;
  }
};

const renderStep = () => {
  switch (currentStep) {
    case 1:
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-2">Select Your Package</h2>
            <p className="text-gray-600">Choose the perfect plan for your store</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`border-2 cursor-pointer transition-all hover:shadow-lg ${
                  formData.package === pkg.id ? 'border-black bg-gray-50' : 'border-gray-200'
                }`}
                onClick={() => updateFormData('package', pkg.id)}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-black mb-2">{pkg.name}</h3>
                    <div className="text-2xl font-bold text-black">{pkg.price}</div>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {formData.package === pkg.id && (
                    <div className="mt-4 flex items-center justify-center">
                      <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="ml-2 text-sm font-medium text-black">Selected</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-2">Store Details</h2>
            <p className="text-gray-600">Tell us about your store</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="storeName" className="text-black font-medium">Store Name</Label>
              <Input
                id="storeName"
                value={formData.storeName}
                onChange={(e) => updateFormData('storeName', e.target.value)}
                placeholder="My Amazing Store"
                className="border-gray-300 focus:border-black"
              />
            </div>
            <div>
              <Label htmlFor="ownerName" className="text-black font-medium">Owner Name</Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => updateFormData('ownerName', e.target.value)}
                placeholder="John Doe"
                className="border-gray-300 focus:border-black"
              />
            </div>
            <div>
              <Label htmlFor="ownerEmail" className="text-black font-medium">Owner Email</Label>
              <Input
                id="ownerEmail"
                type="email"
                value={formData.ownerEmail}
                onChange={(e) => updateFormData('ownerEmail', e.target.value)}
                placeholder="john@example.com"
                className="border-gray-300 focus:border-black"
              />
            </div>
            <div>
              <Label htmlFor="ownerPhone" className="text-black font-medium">Owner Phone</Label>
              <Input
                id="ownerPhone"
                type="tel"
                value={formData.ownerPhone}
                onChange={(e) => updateFormData('ownerPhone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="border-gray-300 focus:border-black"
              />
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-2">Choose Subdomain</h2>
            <p className="text-gray-600">Select your store web address</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subdomain" className="text-black font-medium">Subdomain</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="subdomain"
                  value={formData.subdomain}
                  onChange={(e) => updateFormData('subdomain', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="mystore"
                  className="border-gray-300 focus:border-black"
                />
                <span className="text-gray-500 whitespace-nowrap">.bajgo.com</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Your store will be available at: {formData.subdomain || 'mystore'}.bajgo.com</p>
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-2">Select Services</h2>
            <p className="text-gray-600">Choose which services to integrate with your store</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={formData.services.google}
                    onCheckedChange={(checked) => updateNestedFormData('services', 'google', checked)}
                  />
                  <div>
                    <h3 className="font-medium text-black">Google OAuth</h3>
                    <p className="text-sm text-gray-600">Allow customers to login with Google</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={formData.services.facebook}
                    onCheckedChange={(checked) => updateNestedFormData('services', 'facebook', checked)}
                  />
                  <div>
                    <h3 className="font-medium text-black">Facebook Login</h3>
                    <p className="text-sm text-gray-600">Allow customers to login with Facebook</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={formData.services.stripe}
                    onCheckedChange={(checked) => updateNestedFormData('services', 'stripe', checked)}
                  />
                  <div>
                    <h3 className="font-medium text-black">Stripe Payments</h3>
                    <p className="text-sm text-gray-600">Accept credit card payments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={formData.services.paypal}
                    onCheckedChange={(checked) => updateNestedFormData('services', 'paypal', checked)}
                  />
                  <div>
                    <h3 className="font-medium text-black">PayPal</h3>
                    <p className="text-sm text-gray-600">Accept PayPal payments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case 5:
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-2">Service Credentials</h2>
            <p className="text-gray-600">Enter your API keys and credentials for selected services</p>
          </div>
          <div className="space-y-6">
            {formData.services.google && (
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-black">Google OAuth</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-black font-medium">Client ID</Label>
                    <Input
                      value={formData.serviceCredentials.googleClientId}
                      onChange={(e) => updateNestedFormData('serviceCredentials', 'googleClientId', e.target.value)}
                      placeholder="Enter Google Client ID"
                      className="border-gray-300 focus:border-black"
                    />
                  </div>
                  <div>
                    <Label className="text-black font-medium">Client Secret</Label>
                    <Input
                      type="password"
                      value={formData.serviceCredentials.googleClientSecret}
                      onChange={(e) => updateNestedFormData('serviceCredentials', 'googleClientSecret', e.target.value)}
                      placeholder="Enter Google Client Secret"
                      className="border-gray-300 focus:border-black"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            {formData.services.facebook && (
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-black">Facebook Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-black font-medium">App ID</Label>
                    <Input
                      value={formData.serviceCredentials.facebookAppId}
                      onChange={(e) => updateNestedFormData('serviceCredentials', 'facebookAppId', e.target.value)}
                      placeholder="Enter Facebook App ID"
                      className="border-gray-300 focus:border-black"
                    />
                  </div>
                  <div>
                    <Label className="text-black font-medium">App Secret</Label>
                    <Input
                      type="password"
                      value={formData.serviceCredentials.facebookAppSecret}
                      onChange={(e) => updateNestedFormData('serviceCredentials', 'facebookAppSecret', e.target.value)}
                      placeholder="Enter Facebook App Secret"
                      className="border-gray-300 focus:border-black"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            {formData.services.stripe && (
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-black">Stripe Payments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-black font-medium">Publishable Key</Label>
                    <Input
                      value={formData.serviceCredentials.stripePublishableKey}
                      onChange={(e) => updateNestedFormData('serviceCredentials', 'stripePublishableKey', e.target.value)}
                      placeholder="pk_test_..."
                      className="border-gray-300 focus:border-black"
                    />
                  </div>
                  <div>
                    <Label className="text-black font-medium">Secret Key</Label>
                    <Input
                      type="password"
                      value={formData.serviceCredentials.stripeSecretKey}
                      onChange={(e) => updateNestedFormData('serviceCredentials', 'stripeSecretKey', e.target.value)}
                      placeholder="sk_test_..."
                      className="border-gray-300 focus:border-black"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            {formData.services.paypal && (
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-black">PayPal Payments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-black font-medium">Client ID</Label>
                    <Input
                      value={formData.serviceCredentials.paypalClientId}
                      onChange={(e) => updateNestedFormData('serviceCredentials', 'paypalClientId', e.target.value)}
                      placeholder="Enter PayPal Client ID"
                      className="border-gray-300 focus:border-black"
                    />
                  </div>
                  <div>
                    <Label className="text-black font-medium">Client Secret</Label>
                    <Input
                      type="password"
                      value={formData.serviceCredentials.paypalClientSecret}
                      onChange={(e) => updateNestedFormData('serviceCredentials', 'paypalClientSecret', e.target.value)}
                      placeholder="Enter PayPal Client Secret"
                      className="border-gray-300 focus:border-black"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      );

    case 6:
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-2">Admin Credentials</h2>
            <p className="text-gray-600">Create your admin account to manage your store</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="adminEmail" className="text-black font-medium">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={formData.adminCredentials.adminEmail}
                onChange={(e) => updateNestedFormData('adminCredentials', 'adminEmail', e.target.value)}
                placeholder="admin@yourstore.com"
                className="border-gray-300 focus:border-black"
              />
            </div>
            <div>
              <Label htmlFor="adminPassword" className="text-black font-medium">Password</Label>
              <Input
                id="adminPassword"
                type="password"
                value={formData.adminCredentials.adminPassword}
                onChange={(e) => updateNestedFormData('adminCredentials', 'adminPassword', e.target.value)}
                placeholder="Create a strong password"
                className="border-gray-300 focus:border-black"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-black font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.adminCredentials.confirmPassword}
                onChange={(e) => updateNestedFormData('adminCredentials', 'confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                className="border-gray-300 focus:border-black"
              />
              {formData.adminCredentials.adminPassword &&
                formData.adminCredentials.confirmPassword &&
                formData.adminCredentials.adminPassword !== formData.adminCredentials.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                )}
            </div>
          </div>
        </div>
      );

    case 7:
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-2">Payment Details</h2>
            <p className="text-gray-600">Enter your payment information to start your free trial</p>
          </div>
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-black">Selected Package</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Package:</span>
                <span className="text-black font-medium">{packages.find((p) => p.id === formData.package)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trial Period:</span>
                <span className="text-black font-medium">14 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Due Today:</span>
                <span className="text-black font-medium">$0.00</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-black">Credit Card Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cardNumber" className="text-black font-medium">Card Number</Label>
               <Input
  id="cardNumber"
  value={formData.paymentCredentials.cardNumber}
  onChange={(e) => {
    // Remove spaces
    const rawValue = e.target.value.replace(/\s/g, '');
    // Limit to 16 digits
    if (rawValue.length <= 16) {
      updateNestedFormData('paymentCredentials', 'cardNumber', rawValue);
    }
  }}
  placeholder="4242 4242 4242 4242"
  className="border-gray-300 focus:border-black"
  maxLength={16} // Optional, mostly for safety
/>

              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="expiry" className="text-black font-medium">Expiry Date</Label>
                  <Input
                    id="expiry"
                    value={formData.paymentCredentials.expiry}
                    onChange={(e) => updateNestedFormData('paymentCredentials', 'expiry', e.target.value)}
                    placeholder="08/29"
                    className="border-gray-300 focus:border-black"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="cvv" className="text-black font-medium">CVV</Label>
                  <Input
                    id="cvv"
                    value={formData.paymentCredentials.cvv}
                    onChange={(e) => updateNestedFormData('paymentCredentials', 'cvv', e.target.value)}
                    placeholder="009"
                    className="border-gray-300 focus:border-black"
                  />
                </div>
              </div>
              {formData.paymentCredentials.cardNumber &&
                (formData.paymentCredentials.cardNumber !== '4242424242424242' ||
                  formData.paymentCredentials.expiry !== '08/29' ||
                  formData.paymentCredentials.cvv !== '009') && (
                  <p className="text-red-500 text-sm mt-1">
                    Please use card number 4242 4242 4242 4242, expiry 08/29, CVV 009 for this trial
                  </p>
                )}
            </CardContent>
          </Card>
        </div>
      );

    case 8:
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-2">Deploy Your Store</h2>
            <p className="text-gray-600">Ready to launch your digital store</p>
          </div>
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-black mb-4">Deployment Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="text-black font-medium">{packages.find((p) => p.id === formData.package)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Store Name:</span>
                  <span className="text-black font-medium">{formData.storeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subdomain:</span>
                  <span className="text-black font-medium">{formData.subdomain}.bajgo.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Services:</span>
                  <span className="text-black font-medium">
                    {Object.entries(formData.services)
                      .filter(([key, value]) => value)
                      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                      .join(', ')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          {deploymentError && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <div className="space-y-1">
                  <p className="font-medium">Deployment Failed</p>
                  <p className="text-sm">{deploymentError}</p>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      );

    case 9:
      return (
        <div className="space-y-6 text-center">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-black mb-2">Store Activation In Progress</h2>
              <p className="text-gray-600">
                Thank you, your store is being activated and you will be notified when its done via email. This usually takes 10-15 minutes.
              </p>
            </CardContent>
          </Card>

          {deploymentResult && (
            <Card className="border-gray-200 text-left">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-black mb-4">Deployment Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Client ID:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-black font-mono text-xs">{deploymentResult.clientId}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0"
                        onClick={() => navigator.clipboard.writeText(deploymentResult.clientId)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  {deploymentResult.urls && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Storefront:</span>
                        <span className="text-black font-mono text-xs">{deploymentResult.urls.storefront}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Admin Panel:</span>
                        <span className="text-black font-mono text-xs">{deploymentResult.urls.admin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">API:</span>
                        <span className="text-black font-mono text-xs">{deploymentResult.urls.api}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {deploymentResult?.urls && (
            <div className="grid gap-4 md:grid-cols-2">
              <Button
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => window.open(deploymentResult.urls.storefront, '_blank')}
              >
                <Store className="w-4 h-4 mr-2" />
                Visit Storefront
              </Button>
              <Button
                variant="outline"
                className="border-black text-black hover:bg-gray-50"
                onClick={() => window.open(deploymentResult.urls.admin, '_blank')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
            </div>
          )}

          {deploymentResult && (
            <div className="grid gap-2 md:grid-cols-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
                onClick={() => {
                  const data = JSON.stringify({ formData, deploymentResult }, null, 2);
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `store-config-${formData.subdomain}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Download Config
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
                onClick={() => setCurrentStep(1)}
              >
                <Package className="w-4 h-4 mr-2" />
                Create Another Store
              </Button>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
};
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Digital Store Onboarding</h1>
          <p className="text-gray-600">Create your online store in 7 simple steps</p>
        </div>

        {/* Progress Steps */}
        {currentStep <= 7 && (
          <div className="flex justify-between items-center mb-8 px-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 transition-all ${
                    isCompleted ? 'bg-black border-black text-white' :
                    isActive ? 'border-black text-black' : 'border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs text-center font-medium ${
                    isActive ? 'text-black' : isCompleted ? 'text-black' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block w-20 h-0.5 absolute mt-6 ml-20 ${
                      isCompleted ? 'bg-black' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Main Content */}
        <Card className="border-gray-200 shadow-lg">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentStep <= 7 && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={!isStepValid() || isLoading}
              className="bg-black text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {currentStep === 7 ? (
                <>
                  Deploy Store
                  <Server className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Need help? Contact our support team at support@digitalstore.com</p>
        </div>
      </div>

      {/* Deployment Dialog */}
      <DeploymentDialog 
        isOpen={showDeploymentDialog}
        onClose={() => setShowDeploymentDialog(false)}
        progress={deploymentProgress}
        timeRemaining={deploymentTimeRemaining}
      />
    </div>
  );
};

export default OnboardingApp;