import React from 'react';
import { TrendingUp, Users, Package, Star } from 'lucide-react';

const QuickStats: React.FC = () => {
  const stats = [
    {
      icon: Package,
      value: '500+',
      label: 'منتج متوفر',
      color: 'text-red-400',
      bgColor: 'from-red-500/10 to-red-600/10',
      borderColor: 'border-red-500/30'
    },
    {
      icon: Users,
      value: '1000+',
      label: 'عميل راضي',
      color: 'text-red-400',
      bgColor: 'from-red-500/10 to-red-600/10',
      borderColor: 'border-red-500/30'
    },
    {
      icon: TrendingUp,
      value: '95/100',
      label: 'معدل الرضا',
      color: 'text-red-400',
      bgColor: 'from-red-500/10 to-red-600/10',
      borderColor: 'border-red-500/30'
    },
    {
      icon: Star,
      value: '4.8',
      label: 'تقييم عام',
      color: 'text-red-400',
      bgColor: 'from-red-500/10 to-red-600/10',
      borderColor: 'border-red-500/30'
    }
  ];

  return (
    <div className="py-16 relative z-10 bg-gradient-to-b from-transparent to-red-500/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-slideUp">
            إحصائيات{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
              Red1One
            </span>
          </h2>
          <p className="text-gray-300 text-lg animate-slideUp" style={{ animationDelay: '0.2s' }}>
            أرقام تتحدث عن جودة خدماتنا وثقة عملائنا
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-xl p-6 text-center border ${stat.borderColor} hover:border-red-500/60 transition-all duration-300 group animate-slideUp transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/20`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all duration-300`}>
                <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
              </div>
              <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm font-semibold group-hover:text-white transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* شعار ختامي */}
        <div className="text-center mt-12 animate-slideUp" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-full px-6 py-3">
            <span className="text-red-400 font-bold">🏆</span>
            <span className="text-white font-semibold">الخيار الأول للتسوق الإلكتروني في الجزائر</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;