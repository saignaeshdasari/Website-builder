import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import {motion} from 'motion/react'
import axios from 'axios';
import { serverUrl } from '../App';
const plans = [
  {
    key: "free",
    name: "Free",
    price: "₹0",
    credits: "100",
    description: "Perfect for beginners and testing the platform.",
    features: [
      "100 AI credits/month",
      "Basic website generation",
      "Community support",
      "Limited templates",
    ],
    popular: false,
    button: "Get Started",
  },

  {
    key: "pro",
    name: "Pro",
    price: "₹300",
    credits: "1000",
    description: "Best for freelancers and developers building projects.",
    features: [
      "5000 AI credits/month",
      "Advanced AI website generation",
      "Premium templates",
      "Faster response speed",
      "Export source code",
      "Priority support",
    ],
    popular: true,
    button: "Upgrade to Pro",
  },

  {
    key: "pro-max",
    name: "Pro Max",
    price: "₹500",
    credits: "2000",
    description: "Built for agencies, startups, and power users.",
    features: [
      "20000 AI credits/month",
      "Unlimited premium templates",
      "Ultra-fast AI generation",
      "Team collaboration",
      "Custom branding",
      "API access",
      "24/7 premium support",
    ],
    popular: false,
    button: "Go Pro Max",
  },
];
const Pricing = () => {
  const navigate = useNavigate()
  const {userData} = useSelector(state=>state.user)
  const [loading,setloading] = useState(null)
  const handleBuy = async(planKey)=>{
  if(!userData){
    navigate("/")
    return
  }
  if(planKey == "free"){
    navigate("/dashboard")
  }
  setloading(planKey)
  try {
   const result = await axios.post(`${serverUrl}/api/billing`,{planType:planKey},{withCredentials:true}) 
   window.location.href=result.data.sessionUrl
  } catch (error) {
    console.log(error.response.data); 
   setloading(null)
  }
  }
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-16 pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>
      <button
        className="relative z-10 mb-8 items-center gap-2 text-zinc-400 hover:text-while-white transition cursor-pointer font-bold"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} />
        Back
      </button>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-4xl mx-auto text-center mb-14"
      >
        <h1 className="text-4xl font-bold text-white text-center">
          Simple & Transparent Pricing
        </h1>

        <p className="text-gray-400 text-center mt-4 max-w-2xl mx-auto text-lg">
          Choose the perfect plan for your needs. Start free and upgrade anytime
          to unlock more AI credits, premium features, faster generation, and
          advanced tools for building powerful websites.
        </p>
      </motion.div>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`relative rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
      ${
        p.popular
          ? "border-purple-500 bg-white/10 shadow-purple-500/20"
          : "border-white/10 bg-white/5"
      }`}
          >
            {p.popular && (
              <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <h2 className="text-2xl font-bold text-white">{p.name}</h2>

            <div className="mt-6 flex items-end gap-1">
              <span className="text-5xl font-extrabold text-white">
                {p.price}
              </span>
              <span className="text-gray-400 mb-1">/month</span>
            </div>

            <p className="mt-4 text-gray-400">{p.description}</p>

            <div className="mt-6">
              <p className="text-sm text-purple-400 font-semibold">
                {p.credits} Credits Included
              </p>
            </div>

            <ul className="mt-6 space-y-4">
              {p.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  {feature}
                </li>
              ))}
            </ul>
 
            <button
            disabled={loading}
            onClick={()=>handleBuy(p.key)}
              className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all duration-300
        ${
          p.popular
            ? "bg-purple-600 hover:bg-purple-700 text-white"
            : "bg-white/10 hover:bg-white/20 text-white"
        }`}
            >
              {loading===p.key?"Redirecting...":p.button}
              
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Pricing
