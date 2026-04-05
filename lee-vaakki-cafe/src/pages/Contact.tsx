import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-brand-dark text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold mb-6"
          >
            Get in <span className="text-brand-green">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Have a question or feedback? We'd love to hear from you. Reach out to us or visit our branch.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {[
              { icon: <MapPin />, title: "Address", content: "Thiruporur Main Road, Mahabalipuram, Chennai" },
              { icon: <Phone />, title: "Phone", content: "+91 98765 43210" },
              { icon: <Mail />, title: "Email", content: "hello@leevaakkicafe.com" },
              { icon: <Clock />, title: "Hours", content: "8:00 AM - 10:00 PM Daily" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl subway-shadow flex items-start gap-4 border border-gray-50"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-12 rounded-[2rem] subway-shadow border border-gray-50 h-full"
            >
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                  <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green">
                    <CheckCircle2 size={48} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-display font-bold text-brand-dark mb-2">Message Sent!</h3>
                    <p className="text-gray-500">Thank you for reaching out. We'll get back to you shortly.</p>
                  </div>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="bg-brand-green text-white px-8 py-3 rounded-full font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-display font-bold text-brand-dark mb-8">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                        <input
                          required
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-green transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                        <input
                          required
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-green transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-green transition-all resize-none"
                      ></textarea>
                    </div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-brand-green text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send size={20} />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="rounded-[2.5rem] overflow-hidden subway-shadow h-[450px] relative bg-gray-100">
          {/* Placeholder for Map */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <MapPin size={48} className="text-brand-green mb-4" />
            <h3 className="text-2xl font-display font-bold text-brand-dark mb-2">Find Us on the Map</h3>
            <p className="text-gray-500 max-w-md">We're located on the main road to Mahabalipuram, easily accessible for a quick stopover.</p>
            <a 
              href="https://www.google.com/maps/search/LEE+VAAKKI+Cafe+Mahabalipuram" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 bg-brand-dark text-white px-8 py-3 rounded-full font-bold"
            >
              Open in Google Maps
            </a>
          </div>
          {/* Simulated Map Background */}
          <div className="w-full h-full opacity-20 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/80.17,12.62,13/1280x450?access_token=pk.eyJ1IjoiYWlzdHVkaW8iLCJhIjoiY2x0eGZ4Z2Z4MDB4NDJrbnZ4Z2Z4MDB4NCJ9')] bg-cover"></div>
        </div>
      </section>
    </div>
  );
}
