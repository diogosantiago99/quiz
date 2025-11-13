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
    question: "¿Estás dispuesto a dedicar al menos 1 hora diaria para transformar tu vida financiera en los próximos 30 días?",
    options: [
      "SÍ - Estoy listo para cambiar mi vida",
      "NO - No tengo tiempo ahora"
    ],
    scores: [15, 0]
  },
  {
    id: 2,
    question: "¿Cuál es tu situación financiera actual?",
    options: [
      "Necesito ingresos extra urgentemente",
      "Quiero aumentar mis ingresos actuales", 
      "Busco independencia financiera",
      "Solo curiosidad"
    ],
    scores: [15, 12, 13, 3]
  },
  {
    id: 3,
    question: "¿Cuánto tiempo pasas en redes sociales por día?",
    options: [
      "Más de 4 horas",
      "2-4 horas",
      "1-2 horas",
      "Menos de 1 hora"
    ],
    scores: [15, 12, 9, 5]
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
    scores: [15, 13, 10, 7]
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
    scores: [15, 12, 9, 3]
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
    scores: [13, 15, 12, 3]
  },
  {
    id: 7,
    question: "Si pudieras empezar hoy, ¿cuándo te gustaría ver los primeros resultados?",
    options: [
      "En los próximos 30 días",
      "En 2-3 meses",
      "Hasta fin de año",
      "No tengo prisa"
    ],
    scores: [15, 12, 13, 6]
  }
]

export default function QuizRendaExtra() {
  const [currentStep, setCurrentStep] = useState(0) // 0 = landing, 1-7 = questions, 8 = result
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
      if (currentStep < 7) {
        setCurrentStep(currentStep + 1)
      } else {
        setCurrentStep(8) // Result page
      }
    }, 500)
  }

  const getResultMessage = () => {
    if (totalScore >= 80) {
      return {
        title: "🔥 ¡PERFIL IDEAL PARA INGRESOS EXTRA AUTOMÁTICOS!",
        subtitle: "¡Tienes TODO para facturar alto con Instagram y TikTok en 2026!",
        urgency: "⏰ ÚLTIMAS PLAZAS DE 2025 - ¡Asegura tu lugar antes de que termine el año!"
      }
    } else if (totalScore >= 60) {
      return {
        title: "✨ ¡TIENES POTENCIAL PARA INGRESOS EXTRA!",
        subtitle: "¡Con las estrategias correctas, puedes empezar a facturar en 2026!",
        urgency: "🎁 OFERTA ESPECIAL DE FIN DE AÑO - ¡Comienza 2026 con ingresos garantizados!"
      }
    } else {
      return {
        title: "💡 ¡DESCUBRE TU POTENCIAL DE INGRESOS EXTRA!",
        subtitle: "¡Incluso empezando desde cero, puedes facturar con redes sociales!",
        urgency: "🚀 CLASE GRATUITA - ¡Aprende el método que está cambiando vidas!"
      }
    }
  }

  const progress = currentStep === 0 ? 0 : currentStep === 8 ? 100 : (currentStep / 7) * 100

  // Landing Page
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          {/* Seasonal Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-400 to-emerald-500 text-black px-3 py-2 sm:px-4 rounded-full font-bold text-xs sm:text-sm mb-6 sm:mb-8 animate-pulse">
            <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">ÚLTIMOS DÍAS DE 2025</span>
            <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>

          {/* Main Question - Grande e Impactante */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 sm:mb-10 leading-tight px-2">
            ¿Quieres ganar
            <span className="bg-gradient-to-r from-lime-400 via-emerald-500 to-green-500 bg-clip-text text-transparent"> $1.500+ USD </span>
            por mes con
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"> Instagram y TikTok</span>?
          </h1>

          {/* Simple Yes/No Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-2xl mx-auto mb-8">
            <Button 
              onClick={() => setCurrentStep(1)}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-black text-xl sm:text-2xl px-10 sm:px-12 py-8 sm:py-10 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl flex-1"
            >
              ✅ SÍ, QUIERO
            </Button>
            <Button 
              onClick={() => setCurrentStep(1)}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white/30 text-white font-bold text-xl sm:text-2xl px-10 sm:px-12 py-8 sm:py-10 rounded-2xl transform hover:scale-105 transition-all duration-300 flex-1"
            >
              🤔 TENGO DUDAS
            </Button>
          </div>

          {/* Social Proof Minimalista */}
          <div className="flex items-center justify-center gap-2 text-lime-400 mb-4">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <span className="text-white ml-2 text-sm sm:text-base">+7.827 personas ya lo lograron</span>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm px-2">
            ⏱️ Quiz de 2 minutos • 100% Gratuito
          </p>
        </div>
      </div>
    )
  }

  // Quiz Questions
  if (currentStep >= 1 && currentStep <= 7) {
    const question = questions[currentStep - 1]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-green-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto w-full">
          {/* Progress */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold text-sm sm:text-base">Pregunta {currentStep} de 7</span>
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

  // Result Page
  if (currentStep === 8) {
    const result = getResultMessage()
    // Garantir pontuação mínima de 85
    const displayScore = Math.max(totalScore, 85)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center p-2 sm:p-4">
        <div className="max-w-2xl mx-auto text-center px-3 sm:px-6 w-full">
          {/* Celebration */}
          <div className="text-5xl sm:text-7xl mb-6 sm:mb-8">🎉</div>
          
          {/* Score Display - Ultra Minimalista */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-5xl sm:text-6xl font-black text-white">
                {displayScore}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-gray-400">/100</span>
            </div>
            <p className="text-lime-400 font-bold text-lg sm:text-xl">
              ¡Perfil ideal para ingresos extra!
            </p>
          </div>

          {/* Final CTA */}
          <Button 
            onClick={() => window.open('https://vsl-alpha.vercel.app/', '_blank')}
            className="bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-black font-black text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl w-full sm:w-auto mb-6"
          >
            CLASE GRATUITA 🎁
          </Button>

          <p className="text-gray-400 text-xs sm:text-sm mb-6">
            ⏰ Últimas plazas de 2025
          </p>

          {/* Reset Quiz */}
          <Button 
            onClick={() => {
              setCurrentStep(0)
              setAnswers([])
              setTotalScore(0)
              setSelectedOption(null)
            }}
            variant="ghost"
            className="text-gray-400 hover:text-white text-sm"
          >
            Repetir Quiz
          </Button>
        </div>
      </div>
    )
  }

  return null
}
