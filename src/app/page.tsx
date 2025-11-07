'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ChevronRight, Star, TrendingUp, DollarSign, Calendar, Gift } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  scores: number[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Cuál es tu situación financiera actual?",
    options: [
      "Necesito ingresos extra urgentemente",
      "Quiero aumentar mis ingresos actuales", 
      "Busco independencia financiera",
      "Solo curiosidad"
    ],
    scores: [10, 8, 9, 2]
  },
  {
    id: 2,
    question: "¿Cuánto tiempo pasas en redes sociales por día?",
    options: [
      "Más de 4 horas",
      "2-4 horas",
      "1-2 horas",
      "Menos de 1 hora"
    ],
    scores: [10, 8, 6, 3]
  },
  {
    id: 3,
    question: "¿Ya has intentado ganar dinero online antes?",
    options: [
      "Sí, pero no funcionó",
      "Sí, con poco éxito",
      "Nunca lo intenté",
      "Prefiero no responder"
    ],
    scores: [9, 7, 8, 2]
  },
  {
    id: 4,
    question: "¿Cuál es tu meta de ingresos extra para 2026?",
    options: [
      "$1.500+ USD por mes",
      "$600-1.500 USD por mes",
      "$200-600 USD por mes",
      "Cualquier cantidad ya ayuda"
    ],
    scores: [10, 9, 7, 5]
  },
  {
    id: 5,
    question: "¿Tienes perfil en Instagram o TikTok?",
    options: [
      "Ambos y publico regularmente",
      "Tengo ambos, publico poco",
      "Solo uno de los dos",
      "No tengo ninguno"
    ],
    scores: [10, 8, 6, 2]
  },
  {
    id: 6,
    question: "¿Qué te motiva más a buscar ingresos extra ahora?",
    options: [
      "Realizar sueños de fin de año",
      "Pagar deudas y empezar 2026 limpio",
      "Independencia financiera",
      "Solo curiosidad"
    ],
    scores: [9, 10, 8, 2]
  },
  {
    id: 7,
    question: "¿Cuánto puedes invertir en tu educación financiera?",
    options: [
      "Dispuesto a invertir para resultados",
      "Cantidad moderada",
      "Prefiero empezar con poco",
      "Solo busco cosas gratuitas"
    ],
    scores: [10, 8, 6, 3]
  },
  {
    id: 8,
    question: "¿Cuál es tu mayor desafío para ganar dinero online?",
    options: [
      "No sé por dónde empezar",
      "Falta de conocimiento técnico",
      "Falta de tiempo",
      "Miedo a que no funcione"
    ],
    scores: [9, 8, 6, 7]
  },
  {
    id: 9,
    question: "¿Cómo te sientes sobre el fin de año que se acerca?",
    options: [
      "Ansioso por cambiar de vida en 2026",
      "Preocupado por gastos de fin de año",
      "Motivado para nuevos proyectos",
      "Indiferente"
    ],
    scores: [10, 9, 8, 2]
  },
  {
    id: 10,
    question: "Si pudieras empezar hoy, ¿cuándo te gustaría ver los primeros resultados?",
    options: [
      "En los próximos 30 días",
      "En 2-3 meses",
      "Hasta fin de año",
      "No tengo prisa"
    ],
    scores: [10, 8, 9, 4]
  }
]

export default function QuizRendaExtra() {
  const [currentStep, setCurrentStep] = useState(0) // 0 = landing, 1-10 = questions, 11 = result
  const [answers, setAnswers] = useState<number[]>([])
  const [totalScore, setTotalScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const handleAnswer = (optionIndex: number) => {
    const score = questions[currentStep - 1].scores[optionIndex]
    const newAnswers = [...answers, optionIndex]
    const newScore = totalScore + score
    
    setAnswers(newAnswers)
    setTotalScore(newScore)
    setSelectedOption(null)
    
    setTimeout(() => {
      if (currentStep < 10) {
        setCurrentStep(currentStep + 1)
      } else {
        setCurrentStep(11) // Result page
      }
    }, 500)
  }

  const getResultMessage = () => {
    if (totalScore >= 80) {
      return {
        title: "🔥 ¡PERFIL IDEAL PARA INGRESOS EXTRA AUTOMÁTICOS!",
        subtitle: "¡Tienes TODO para facturar alto con Instagram y TikTok en 2026!",
        description: "Tu perfil indica que estás LISTO para transformar tus redes sociales en una máquina de hacer dinero. Con la metodología correcta, puedes estar facturando tus primeros ingresos este año!",
        urgency: "⏰ ÚLTIMAS PLAZAS DE 2025 - ¡Asegura tu lugar antes de que termine el año!"
      }
    } else if (totalScore >= 60) {
      return {
        title: "✨ ¡TIENES POTENCIAL PARA INGRESOS EXTRA!",
        subtitle: "¡Con las estrategias correctas, puedes empezar a facturar en 2026!",
        description: "Tu perfil muestra que tienes interés real en cambiar de vida. Con el método correcto y un poco de dedicación, puedes estar generando tus primeros ingresos extra antes de Navidad!",
        urgency: "🎁 OFERTA ESPECIAL DE FIN DE AÑO - ¡Comienza 2026 con ingresos garantizados!"
      }
    } else {
      return {
        title: "💡 ¡DESCUBRE TU POTENCIAL DE INGRESOS EXTRA!",
        subtitle: "¡Incluso empezando desde cero, puedes facturar con redes sociales!",
        description: "Todo el mundo puede aprender a monetizar sus redes sociales. Nuestra clase gratuita te mostrará exactamente cómo personas comunes están facturando miles por mes!",
        urgency: "🚀 CLASE GRATUITA - ¡Aprende el método que está cambiando vidas!"
      }
    }
  }

  const progress = currentStep === 0 ? 0 : currentStep === 11 ? 100 : (currentStep / 10) * 100

  // Landing Page
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          {/* Seasonal Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-400 to-emerald-500 text-black px-3 py-2 sm:px-4 rounded-full font-bold text-xs sm:text-sm mb-4 sm:mb-6 animate-pulse">
            <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">ÚLTIMOS DÍAS DE 2025</span>
            <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight px-2">
            Transforma tu
            <span className="bg-gradient-to-r from-lime-400 via-emerald-500 to-green-500 bg-clip-text text-transparent"> Instagram y TikTok </span>
            en una
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"> Máquina de Dinero</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Descubre si tienes el <strong className="text-lime-400">perfil ideal</strong> para generar 
            <strong className="text-green-400"> ingresos extra consistentes</strong> con el método 
            <strong className="text-emerald-400"> Renda Extra Automática</strong> - ¡Aún puedes empezar antes de que termine 2025!
          </p>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 px-2">
            <div className="flex items-center gap-2 text-lime-400">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <span className="text-white ml-2 text-sm sm:text-base">Ya hemos transformado la vida de +7.827 personas</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-white text-sm sm:text-base">Resultados en hasta 30 días</span>
            </div>
          </div>

          {/* Urgency */}
          <div className="bg-emerald-600/20 border border-emerald-500 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-center">ÚLTIMOS DÍAS DE 2025 - ¡Comienza 2026 con ingresos garantizados!</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={() => setCurrentStep(1)}
            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl w-full sm:w-auto"
          >
            <span className="mr-2">🎯</span>
            HACER QUIZ GRATUITO AHORA
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Button>

          <p className="text-gray-400 text-xs sm:text-sm mt-4 px-2">
            ⏱️ Toma solo 2 minutos • 100% Gratuito • Sin spam
          </p>
        </div>
      </div>
    )
  }

  // Quiz Questions
  if (currentStep >= 1 && currentStep <= 10) {
    const question = questions[currentStep - 1]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-green-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto w-full">
          {/* Progress */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold text-sm sm:text-base">Pregunta {currentStep} de 10</span>
              <span className="text-lime-400 font-bold text-sm sm:text-base">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 sm:h-3 bg-gray-700" />
          </div>

          {/* Question Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  variant="outline"
                  className="w-full p-4 sm:p-6 text-left justify-start bg-white/5 hover:bg-white/20 border-white/30 hover:border-white/50 text-white hover:text-white transition-all duration-300 text-sm sm:text-base md:text-lg min-h-[60px] sm:min-h-[70px]"
                >
                  <span className="bg-gradient-to-r from-emerald-400 to-green-400 text-black rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold mr-3 sm:mr-4 text-xs sm:text-sm flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Motivational Message */}
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-gray-300 text-xs sm:text-sm px-4">
              🔥 ¡Cada respuesta nos ayuda a personalizar tu estrategia de ingresos extra!
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Result Page - ÚLTIMA PÁGINA COM MODIFICAÇÕES SOLICITADAS
  if (currentStep === 11) {
    const result = getResultMessage()
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center p-2 sm:p-4">
        <div className="max-w-3xl mx-auto text-center px-3 sm:px-6 w-full">
          {/* Celebration */}
          <div className="text-3xl sm:text-5xl mb-3 sm:mb-4">🎉</div>
          
          {/* Result Title - Responsivo e enquadrado */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-3 leading-tight px-1 sm:px-2">
            {result.title}
          </h1>
          
          {/* Result Subtitle - Responsivo */}
          <h2 className="text-base sm:text-lg md:text-xl text-lime-400 font-bold mb-3 sm:mb-4 px-1 sm:px-2 leading-snug">
            {result.subtitle}
          </h2>
          
          {/* Score Display - Compacto e responsivo */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2 sm:mb-3">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              <span className="text-lg sm:text-xl font-bold text-white text-center">
                Tu Puntuación: {totalScore}/100
              </span>
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
            </div>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm px-1 sm:px-2">
              {result.description}
            </p>
          </div>

          {/* Urgency Banner - Compacto */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg p-2 sm:p-3 mb-4 sm:mb-6 max-w-xl mx-auto animate-pulse">
            <p className="text-white font-bold text-sm sm:text-base px-1 sm:px-2 leading-snug">
              {result.urgency}
            </p>
          </div>

          {/* Final CTA - Responsivo */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <Button 
              onClick={() => window.open('https://ejemplo.com/clase-gratuita', '_blank')}
              className="bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-black font-black text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl w-full sm:w-auto"
            >
              <span className="mr-2">🚀</span>
              ASEGURAR LUGAR EN CLASE GRATUITA
              <span className="ml-2">🎁</span>
            </Button>
            
            <p className="text-gray-300 text-xs sm:text-sm max-w-sm mx-auto px-2 leading-tight">
              ⚡ Clase en vivo • Método completo revelado • Plazas limitadas para 2025
            </p>
          </div>

          {/* Social Proof Final - Compacto e responsivo */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-gray-400 px-2 mb-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <Star className="w-3 h-3 text-lime-400 fill-current" />
              <span>+7.827 estudiantes transformados</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Calendar className="w-3 h-3 text-emerald-400" />
              <span>Resultados en 21 días</span>
            </div>
          </div>

          {/* Reset Quiz - Compacto */}
          <Button 
            onClick={() => {
              setCurrentStep(0)
              setAnswers([])
              setTotalScore(0)
              setSelectedOption(null)
            }}
            variant="ghost"
            className="mt-3 sm:mt-4 text-gray-400 hover:text-white text-xs sm:text-sm"
          >
            Repetir Quiz
          </Button>
        </div>
      </div>
    )
  }

  return null
}